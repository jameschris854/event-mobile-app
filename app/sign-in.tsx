import useAuthStore from '@/hooks/stores/useAuthStore';
import useSnackbarStore from '@/hooks/stores/useSnackbarStore';
import useColors from '@/hooks/useColors';
import { supabase } from '@/utils/supabase';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Alert, } from 'react-native';
import { HelperText,Text, Button, TextInput, useTheme } from 'react-native-paper';

const AuthScreen: React.FC = () => {
  const colors = useColors();
  const { login } = useAuthStore();
  const [authLoader,setAuthLoader] = useState(false);

  const [isSigningUp, setIsSigningUp] = useState(false);
  const snack = useSnackbarStore()
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');

  const validate = () => {
    if(isSigningUp && (!email || !password || !name || !mobile)){
      // snack.showSnackbar('Fields cannot be empty');
    }else if(!email || !password){
        // snack.showSnackbar('Fields cannot be empty');
    }else{
      return true
    }
  }


  const handleAuth = async () => {
    setAuthLoader(true);
    if(!validate()) return snack.showSnackbar('Fields cannot be empty');


    try {
      if (isSigningUp) {
        // Sign-up flow
        console.log("{ email, password ,phone:mobile}",{ email, password ,phone:mobile})
        const { data, error } = await supabase.auth.signUp({ email, password ,phone:mobile});
        console.log(data,error)
        if (error) {
          snack.showSnackbar(error.message);
          return;
        }

        snack.showSnackbar('Account created successfully. You can now log in.');
        setIsSigningUp(false); // Switch to login mode after successful signup
      } else {
        // Login flow
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        console.log(data,error)
        if (error) {
          snack.showSnackbar(error.message);
          return;
        }

        if (data.session) {
          // Use Zustand's `login` method to update the auth store
          login(data.session);
          snack.showSnackbar('Logged in successfully!');
          router.replace('/(app)/(root)/(tabs)');
        }
      }
    } catch (err: any) {
      snack.showSnackbar('Error', err.message);
    } finally{
      setAuthLoader(false);
    }
  };

  const hasErrors = () => {
    return email !== "" && !email.includes('@');
  };

  return (
    <View style={{ padding: 16 ,justifyContent:'center',flex:1,backgroundColor:colors.background}} > 
    <View style={{alignItems:"center"}}>
      <MaterialCommunityIcons name="lightbulb-on-outline" size={150} color={theme.colors.primary} style={{paddingBottom:20}}/>
      <Text variant='headlineLarge' style={{paddingBottom:20}} >
        {isSigningUp ? 'Sign Up' : 'Log In'}
      </Text>
    </View>
      {isSigningUp && (
        <>
          <TextInput
            label={'Name'}
            placeholder='John Doe'
            value={name}
            onChangeText={setName}
            keyboardType='default'
          />
          <HelperText type="error" visible={hasErrors()}>
            Enter a valid name
          </HelperText>
          <TextInput
          label={'Mobile Number'}
          placeholder='8624472357'
          value={mobile}
          onChangeText={setMobile}
          keyboardType='number-pad'
          />
          <HelperText type="error" visible={hasErrors()}>
            Enter a valid name
          </HelperText>
        </>
        )}
      <TextInput
        label={'Email'}
        placeholder="example@gmail.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <HelperText type="error" visible={hasErrors()}>
        Email address is invalid!
      </HelperText>
      <TextInput
        label={'Password'}
        placeholder="**********"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button loading={authLoader} disabled={!validate()} mode='contained' onPress={handleAuth} style={{marginTop:20}}>
        {isSigningUp ? 'Sign Up' : 'Log In'}
      </Button>
      <View style={{flexDirection:"row",alignItems:"center",alignSelf:"center",paddingTop:20}}>
      {isSigningUp ? <>
          <Text variant="bodyLarge">Already have an account ?</Text><Text variant='bodyLarge' style={{color:theme.colors.primary,paddingLeft:8}} onPress={() => setIsSigningUp(false)}>login</Text>
      </>
       : <>
          <Text variant="bodyLarge">Don't have an account yet ?</Text><Text variant='bodyLarge' style={{color:theme.colors.primary,paddingLeft:8}} onPress={() => setIsSigningUp(true)}>Sign Up</Text>
       </>
      }
      </View>
    </View>
  );
};

export default AuthScreen;
