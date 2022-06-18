import * as React from 'react';
import { View, ScrollView, Pressable, Text } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

// Import helper code
import Settings from '../constants/Settings';

// Import styling and components
import { TextParagraph, TextH1, TextH2, TextH3, TextListItem } from "../components/StyledText";
import { MyButton } from '../components/MyButton';
import Styles from "../styles/MainStyle";
import Colours from '../constants/Colours';

export default function SettingsScreen(props) {

  const [fontSizeModifier, setFontSizeModifier] = React.useState(Settings.fontSizeModifier)

  function changeFontSize(sizeModifier) {
    Settings.fontSizeModifier += sizeModifier
    setFontSizeModifier(Settings.fontSizeModifier)
  }

  return (
    <SafeAreaView style={Styles.safeAreaView}>
      <ScrollView style={Styles.container} contentContainerStyle={Styles.contentContainer}>

        <View syle={Styles.settingContainer}>
          <TextH2 style={Styles.settingTitle}>Font Size</TextH2>
          <View style={Styles.settingsButtonContainer}>
            <MyButton
              text="Smaller"
              type="default"    // default*|major|minor
              size="medium"      // small|medium*|large
              onPress={() => {changeFontSize(-0.1)}}
              buttonStyle={Styles.settingsButton}
            />
            <MyButton
              text="Bigger"
              type="default"    // default*|major|minor
              size="medium"      // small|medium*|large
              onPress={() => {changeFontSize(0.1)}}
              buttonStyle={Styles.settingsButton}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}