import React, { useRef, useState, useEffect } from 'react'
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  Dimensions,
  View,
  TouchableOpacity
} from 'react-native'

const { height, width } = Dimensions.get('window')

const DATA = [
  {
    title: "First",
    color: "lightblue"
  },
  {
    title: "Second",
    color: "red"
  },
  {
    title: "Third",
    color: "pink"
  }
]

const Item = ({ title, color }) => (
  <View style={[styles.item, { backgroundColor: color }]}>
    <Text style={styles.title}>{title}</Text>
  </View>
)

const App = () => {

  const renderItem = ({ item }) => <Item title={item.title} color={item.color} />  
  const scrollRef = useRef()
  const [page, setPage] = useState(0)
  const onPressNext = () => {
    setPage(prev => (prev === 2 ? 0 : prev + 1))
  }

  useEffect(() => {
    if(scrollRef.current){
      scrollRef?.current.scrollToIndex({index: page, animated: true})
    }
  }, [page])

  return (
    <>
      <SafeAreaView style={styles.container}>
        <FlatList
          ref={scrollRef}
          scrollEnabled={false}
          horizontal
          data={DATA}
          renderItem={renderItem}
        />
        <TouchableOpacity onPress={onPressNext} style={{ height: 60 }}>
          <Text>{"Next ->"}</Text>
        </TouchableOpacity>

      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    width: width,
    height: height,
    backgroundColor: '#f9c2ff'
  },
  title: {
    fontSize: 32,
  }
})

export default App

