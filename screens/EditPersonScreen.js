import * as React from 'react';
import { View, ScrollView, TextInput, Picker } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

// Import helper code
import Settings from '../constants/Settings';
import { RoiGetDepartments, RoiGetPerson, RoiUpdatePerson } from '../utils/Api';
import { PopupOk, PopupOkCancel } from "../utils/Popup";

// Import styling and components
import { TextParagraph, TextH1, TextLabel } from "../components/StyledText";
import Styles from "../styles/MainStyle";
import { MyButton } from '../components/MyButton';

export default function EditPersonScreen(props) {

  // Set up a default person object
  const personTemplate = {
    id: 0,
    name: "DEFAULT",
    phone: "000000000",
    departmentId: 0,
    street: "UNIFORM LANE",
    city: "UNTOUCHED CITY",
    state: "DEF",
    zip: "1234",
    country: "PEOPLES DEFAULT REPUBLIC OF UNIFORMIA",
    department: null
  }

  // State - data for this component

  //Store person in state
  const [id, setId] = React.useState(personTemplate.id)
  const [name, setName] = React.useState(personTemplate.name)
  const [nameOriginal, setNameOriginal] = React.useState(personTemplate.name)
  const [phone, setPhone] = React.useState(personTemplate.phone)
  const [departmentId, setDepartmentId] = React.useState(personTemplate.departmentId)
  const [street, setStreet] = React.useState(personTemplate.street)
  const [city, setCity] = React.useState(personTemplate.city)
  const [state, setState] = React.useState(personTemplate.state)
  const [zip, setZip] = React.useState(personTemplate.zip)
  const [country, setCountry] = React.useState(personTemplate.country)

  //Set "effect" to retrieve and store data  - only run on mount/unmount (loaded/unloaded)
  //"effectful" code is something that triggers a UI re-render
  React.useEffect(refreshPerson, [])

  //Data array for departments
  const [departments, setDepartments] = React.useState([])
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

  function refreshPerson() {

    //Get person ID passed to this screen (via props)
    const id = props.route.params.id

    //Get data from the API
    RoiGetPerson(id)
      //Success
      .then(data => {
        // Store results in state variable (if data returned)
        if (data) {
          setId(data.id)
          setName(data.name)
          setNameOriginal(data.name)
          setPhone(data.phone)
          setDepartmentId(data.departmentId ? data.departmentId : 0)
          setStreet(data.street)
          setCity(data.city)
          setState(data.state)
          setZip(data.zip)
          setCountry(data.country)
        }
      })
      //Error
      .catch(error => {
        // Display error and navigate back to ViewPeople screen
        PopupOk("API Error", "Could not get person from the server")
        props.navigation.navigate("ViewPeople")
      })
  }

  function showViewPerson() {
    props.navigation.navigate("ViewPerson",{id: id})
  }

  //Edit person
  function editPerson() {
    RoiUpdatePerson(id, name, phone, departmentId, street, city, state, zip, country)
      .then(data => {
        PopupOk("Person Edited", `${name} has been edited.`)
          // props.navigation.replace("Root", {screen: "People"})
          props.navigation.replace("ViewPerson",{id: id})
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

          
        <TextH1 style={{marginTop:0}}>Edit: {nameOriginal}</TextH1>
        
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
            text="Save"
            type="major"    // default*|major|minor
            size="medium"      // small|medium*|large
            onPress={editPerson}
          />
          <MyButton
            text="Cancel"
            type="default"    // default*|major|minor
            size="medium"      // small|medium*|large
            onPress={showViewPerson}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}