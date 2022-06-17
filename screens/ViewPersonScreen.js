import * as React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

// Import helper code
import Settings from '../constants/Settings';
import { RoiDeletePerson, RoiGetPeople, RoiGetPerson } from '../utils/Api';
import { PopupOk, PopupOkCancel } from "../utils/Popup";

// Import styling and components
import { TextParagraph, TextH1, TextLabel } from "../components/StyledText";
import Styles from "../styles/MainStyle";
import { MyButton } from '../components/MyButton';

export default function ViewPersonScreen(props) {

  // Set up a default person object
  const personTemplate = {
    id: 0,
    name: "DEFAULT",
    phone: "000000000",
    departmentId: null,
    street: "UNIFORM LANE",
    city: "UNTOUCHED CITY",
    state: "DEF",
    zip: "1234",
    country: "PEOPLES DEFAULT REPUBLIC OF UNIFORMIA",
    department: null
  }

  // State - data for this component

  //Store person in state
  const [person, setPerson] = React.useState(personTemplate)

  //Set "effect" to retrieve and store data  - only run on mount/unmount (loaded/unloaded)
  //"effectful" code is something that triggers a UI re-render
  React.useEffect(refreshPerson, [])


  function refreshPerson() {

    //Get person ID passed to this screen (via props)
    const id = props.route.params.id

    //Get data from the API
    RoiGetPerson(id)
      //Success
      .then(data => {
        // Store results in state variable (if data returned)
        if (data) setPerson(data)
      })
      //Error
      .catch(error => {
        // Display error and navigate back to ViewPeople screen
        PopupOk("API Error", "Could not get person from the server")
        props.navigation.navigate("ViewPeople")
      })
  }

  function showEditPerson() {
    props.navigation.navigate("EditPerson", {id: person.id})
  }

  //Delete person
  function deletePerson() {
    //Check if person should be deleted
    PopupOkCancel(
      //Title and message
      "Confirm Delete",
      `Are you sure you want to delete ${person.name}`,

      //Ok - delete the person
      () => {
        RoiDeletePerson(person.id)
          .then(data => {
            PopupOk("Person Deleted", `${person.name} has been deleted.`)
            props.navigation.replace("Root", {screen: "People"})
          })
          .catch(error => {
            PopupOk("Error", error)
          })
      },

      //Cancel - do nothing
      () => {

      }
      )
  }

  return (
    <SafeAreaView style={Styles.safeAreaView}>
      <ScrollView style={Styles.container} contentContainerStyle={Styles.contentContainer}>

          
        <TextH1 style={{marginTop:0}}>{person.name}</TextH1>
        
        <View style={Styles.form}>

          <View style={Styles.fieldSet}>
            <TextParagraph style={Styles.legend}>Details</TextParagraph>

            <View style={Styles.formRow}>
              <TextLabel>Name:</TextLabel>
              <TextParagraph>{person.name}</TextParagraph>
            </View>

            <View style={Styles.formRow}>
              <TextLabel>Phone:</TextLabel>
              <TextParagraph>{person.phone}</TextParagraph>
            </View>

            <View style={Styles.formRow}>
              <TextLabel>Department:</TextLabel>
              <TextParagraph>{person.department ? person.department.name : "---"}</TextParagraph>
            </View>
          </View>

          <View style={Styles.fieldSet}>
            <TextParagraph style={Styles.legend}>Address</TextParagraph>
              <View style={Styles.formRow}>
                <TextLabel>Street:</TextLabel>
                <TextParagraph>{person.street}</TextParagraph>
              </View>
              <View style={Styles.formRow}>
                <TextLabel>City:</TextLabel>
                <TextParagraph>{person.city}</TextParagraph>
              </View>
              <View style={Styles.formRow}>
                <TextLabel>State:</TextLabel>
                <TextParagraph>{person.state}</TextParagraph>
              </View>
              <View style={Styles.formRow}>
                <TextLabel>ZIP:</TextLabel>
                <TextParagraph>{person.zip}</TextParagraph>
              </View>
              <View style={Styles.formRow}>
                <TextLabel>Country:</TextLabel>
                <TextParagraph>{person.country}</TextParagraph>
              </View>
          </View>

        </View>

        {/* Buttons */}
        <View style={[Styles.personButtonContainer, {borderBottomWidth: 0, marginBottom: 0}]}>
          <MyButton
            text="Edit"
            type="major"    // default*|major|minor
            size="medium"      // small|medium*|large
            onPress={showEditPerson}
          />
          <MyButton
            text="Delete"
            type="default"    // default*|major|minor
            size="medium"      // small|medium*|large
            onPress={deletePerson}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}