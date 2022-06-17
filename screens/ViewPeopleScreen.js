import * as React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

// Import helper code
import Settings from '../constants/Settings';
import { RoiDeletePerson, RoiGetPeople } from '../utils/Api';
import { PopupOk, PopupOkCancel } from "../utils/Popup";

// Import styling and components
import { TextParagraph, TextH1 } from "../components/StyledText";
import Styles from "../styles/MainStyle";
import { MyButton } from '../components/MyButton';
import { ProgressBar } from 'react-native-web';

export default function ViewPeopleScreen(props) {

  // State - data for this component

  //Data array
  const [people, setPeople] = React.useState([])

  //Set "effect" to retrieve and store data  - only run on mount/unmount (loaded/unloaded)
  //"effectful" code is something that triggers a UI re-render
  React.useEffect(refreshPersonList, [])


  function refreshPersonList() {

    //Get data from the API
    RoiGetPeople()
      //Success
      .then(data => {
        setPeople(data)
      })
      //Error
      .catch(error => {
        PopupOk("API Error", "Could not get people from the server")
      })

    // Refresh the person list data
    //setPeople(peopleList);
  }

  function showAddPerson() {
    props.navigation.replace("Root", {screen:"AddPerson"})
  }

  function showViewPerson(person) {
    // Navigate to ViewPerson and pass through the person's ID as a param
    props.navigation.navigate("ViewPerson",{id: person.id})
  }

  function showEditPerson(person) {
    // Navigate to ViewPerson and pass through the person's ID as a param
    props.navigation.navigate("EditPerson",{id: person.id})
  }

  //Delete person
  function deletePerson(person) {
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
            refreshPersonList()
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

  function displayPeople() {
    // Loop through each item and turn into appropriate output and then return the result
    return people.map(p => {
      //Create and output view for each item
      return (<View key={p.id} style={Styles.personListItem}>
        <View style={Styles.personListItemDetails}>
          <TextParagraph style={Styles.personListItemName}>{p.name}</TextParagraph>
          <TextParagraph style={Styles.personListItemText}>{p.department ? p.department.name : "No Department"}</TextParagraph>
          <TextParagraph style={Styles.personListItemText}>{p.phone}</TextParagraph>
        </View>
        <View style={Styles.personListItemButtons}>
          <MyButton
            text="Info"
            type="major"
            size="small"
            buttonStyle = {Styles.personListItemButton}
            onPress={() => showViewPerson(p)}
          />
          <MyButton
            text="Edit"
            type="default"
            size="small"
            buttonStyle = {Styles.personListItemButton}
            onPress={() => showEditPerson(p)}
          />
          <MyButton
            text="Delete"
            type="minor"
            size="small"
            buttonStyle = {Styles.personListItemButton}
            onPress={() => deletePerson(p)}
          />
        </View>
      </View>
      )
    })
  }


  return (
    <SafeAreaView style={Styles.safeAreaView}>

      <View style ={Styles.personButtonContainer}>
        <MyButton
          text="Add Staff"
          type="major"
          size="small"
          onPress={showAddPerson}
        />
        <MyButton
          text="Refresh List"
          type="default"
          size="small"
          onPress={refreshPersonList}
        />
      </View>

      <ScrollView style={Styles.container} contentContainerStyle={Styles.contentContainer}>

        <View style={Styles.personList}>
          {displayPeople()}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}