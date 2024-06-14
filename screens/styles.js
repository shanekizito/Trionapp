import styled from "styled-components/native";

export const OTPInputContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const TextInputHidden = styled.TextInput`
 
  border-color: "#e5e5e5";
  border-width: 1px;
  border-radius: 5px;
  padding: 15px;
  margin-top: 50px;
  color: white; 
  position: absolute;
  opacity: 0;
`;

export const SplitOTPBoxesContainer = styled.Pressable`
  width: 99%;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const SplitBoxes = styled.View`
        borderBottomColor:'rgba(196, 193, 193, 0.945)';
        borderBottomWidth:1;
        color:'black';
        height:45;
        marginTop:20;
        padding: 10px;
        fontFamily: 'RalewayRegular'
`;

export const SplitBoxText = styled.Text`
  font-size: 20px;
  text-align: center;
  
`;

export const SplitBoxesFocused = styled(SplitBoxes)`
  border-color: #ecdbba;
  
`;

export const ButtonContainer = styled.TouchableOpacity`
  background-color: #000000;
  padding: 20px;
  justify-content: center;
  align-items: center;
  width: 200px;
  margin-top: 30px;
`;

export const ButtonText = styled.Text`
  color: black;
  font-size: 20px;
`;