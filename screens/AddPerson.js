import * as React from 'react';
import { View, ScrollView, TextInput, Picker } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

// Import helper code
import Settings from '../constants/Settings';
import { RoiAddPerson, RoiGetDepartments, RoiUpdatePerson } from '../utils/Api';
import { PopupOk, PopupOkCancel } from "../utils/Popup";

// Import styling and components
import { TextParagraph, TextH1, TextLabel } from "../components/StyledText";
import Styles from "../styles/MainStyle";
import { MyButton } from '../components/MyButton';

export default function AddPersonScreen(props) {

  // State - data for this component

  //Store person in state
  const [name, setName] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [departmentId, setDepartmentId] = React.useState(0)
  const [street, setStreet] = React.useState("")
  const [city, setCity] = React.useState("")
  const [state, setState] = React.useState("")
  const [zip, setZip] = React.useState("")
  const [country, setCountry] = React.useState("")

  const [departments, setDepartments] = React.useState([])

  //Set "effect" to retrieve and store data  - only run on mount/unmount (loaded/unloaded)
  //"effectful" code is something that triggers a UI re-render
  React.useEffect(refreshDepartments, [])

  function refreshDepartments() {

    //Get data from the API
    RoiGetDepartments()
      //Success
      .then(data => {
        setDepartments(data)
      })
      //Error
      .catch(error => {
        PopupOk("API Error", "Could not get departments from the server")
      })

    // Refresh the person list data
    //setPeople(peopleList);
  }

  function showViewPeople() {
    props.navigation.replace("Root", {screen: "People"})
  }

  function showViewPerson(pId) {
    props.navigation.navigate("Root", {screen: "People", params: {screen: "ViewPerson", params: {id: pId}}})
  }

  //Add person
  function addPerson() {
    RoiAddPerson(name, phone, departmentId, street, city, state, zip, country)
      .then(data => {
        PopupOk("Person Added", `${name} has been added.`)
        showViewPeople()
      })
      .catch(error => {
        PopupOk("Error", error)
      })
  }

  // Display the department picker list items
  function displayDepartmentListItems() {
    //Loop through each item and turn it into a <Picker.Item> element
    return departments.map(d => {
      return <Picker.Item key={d.id} label={d.name} value={d.id}/>
    })
  }

  return (
    <SafeAreaView style={Styles.safeAreaView}>
      <ScrollView style={Styles.container} contentContainerStyle={Styles.contentContainer}>
        <View style={Styles.form}>

          <View style={Styles.fieldSet}>
            <TextParagraph style={Styles.legend}>Details</TextParagraph>

            <View style={Styles.formRow}>
              <TextLabel>Name:</TextLabel>
              <TextInput style={Styles.textInput} value={name} onChangeText={setName}/>
            </View>

            <View style={Styles.formRow}>
              <TextLabel>Phone:</TextLabel>
              <TextInput style={Styles.textInput} value={phone} onChangeText={setPhone}/>
            </View>

            <View style={Styles.formRow}>
              <TextLabel>Department:</TextLabel>
              {/* <TextInput style={Styles.textInput} value={departmentId} onChangeText={setDepartmentId}/> */}
              <Picker
                selectedValue={departmentId}
                onValueChange={setDepartmentId}
                style={Styles.picker}
                itemStyle={Styles.pickerItem}
              >
                {displayDepartmentListItems()}
              </Picker>
            </View>
          </View>

          <View style={Styles.fieldSet}>
            <TextParagraph style={Styles.legend}>Address</TextParagraph>
              <View style={Styles.formRow}>
                <TextLabel>Street:</TextLabel>
                <TextInput style={Styles.textInput} value={street} onChangeText={setStreet}/>
              </View>
              <View style={Styles.formRow}>
                <TextLabel>City:</TextLabel>
                <TextInput style={Styles.textInput} value={city} onChangeText={setCity}/>
              </View>
              <View style={Styles.formRow}>
                <TextLabel>State:</TextLabel>
                <TextInput style={Styles.textInput} value={state} onChangeText={setState}/>
              </View>
              <View style={Styles.formRow}>
                <TextLabel>ZIP:</TextLabel>
                <TextInput style={Styles.textInput} value={zip} onChangeText={setZip}/>
              </View>
              <View style={Styles.formRow}>
                <TextLabel>Country:</TextLabel>
                <TextInput style={Styles.textInput} value={country} onChangeText={setCountry}/>
              </View>
          </View>

        </View>

        {/* Buttons */}
        <View style={[Styles.personButtonContainer, {borderBottomWidth: 0, marginBottom: 0}]}>
          <MyButton
            text="Add"
            type="major"    // default*|major|minor
            size="medium"      // small|medium*|large
            onPress={addPerson}
          />
          <MyButton
            text="Cancel"
            type="default"    // default*|major|minor
            size="medium"      // small|medium*|large
            onPress={showViewPeople}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}