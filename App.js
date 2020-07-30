import React, { useState } from 'react';
import axios from 'axios'
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Image, FlatList, Modal } from 'react-native';

export default function App() {
                                const apiUrl =
                                  "http://www.omdbapi.com/?i=tt3896198&apikey=c8d86e1c";
                                const [state, setState] = useState({
                                  s: "Enter a movie...",
                                  results: [],
                                  selected: {},
                                });

                                const search = () => {
                                  axios(apiUrl + "&s=" + state.s).then(
                                    ({ data }) => {
                                      let results = data.Search;
                                      setState((prevState) => {
                                        return {
                                          ...prevState,
                                          results: results,
                                        };
                                      });
                                    }
                                  );
                                };

                                const openPopup = (id) => {
                                  axios(apiUrl + "&t=" + id).then(
                                    ({ data }) => {
                                      let result = data
                                      console.log(result)
                                      setState((prevState) => {
                                        return {
                                          ...prevState,
                                          selected: result,
                                        }
                                      })
                                    }
                                  )
                                }

                                return (
                                  <View style={styles.container}>
                                    <Text style={styles.title}>Movie finder</Text>
                                    <Text style={styles.title2}>by le_kg</Text>
                                    <TextInput
                                      value={state.s}
                                      style={styles.searchbox}
                                      onChangeText={(text) =>
                                        setState((prevState) => {
                                          return { ...prevState, s: text };
                                        })
                                      }
                                      onSubmitEditing={search}
                                    />
                                    <FlatList
                                      style={styles.results}
                                      data={state.results}
                                      keyExtractor={(item) => item.imdbID}
                                      showsVerticalScrollIndicator={false}
                                      renderItem={({ item }) => (
                                        <TouchableHighlight onPress={() => openPopup(item.Title)}>
                                        <View style={styles.result}>
                                          <Image
                                            source={{ uri: item.Poster }}
                                            style={{
                                              width: "100%",
                                              height: 300,
                                            }}
                                            resizeMode="cover"
                                          />
                                          <Text style={styles.heading}>
                                            {item.Title}
                                          </Text>
                                        </View>
                                        </TouchableHighlight>
                                      )}
                                      keyboardShouldPersistTaps="always"
                                    />
                                    <Modal
                                    animationType="fade"
                                    transparent={false}
                                    visible={(typeof state.selected.Title != "undefined" ? true : false)}
                                    >
                                    <View style={styles.popup}>
                                     <Text style={styles.poptitle}>{state.selected.Title}</Text>
                                     <Text style={{marginBottom: 20}}>Rating: {state.selected.imdbRating}</Text>
                                     <Text>{state.selected.Plot}</Text>
                                     <Text style={{marginTop: 20}}>{state.selected.Year}</Text>
                                    </View>
                                    <TouchableHighlight
                                    onPress={() => setState(prevState => {
                                      return {...prevState, selected: {}}
                                    })}
                                    >
                                    <Text style={styles.closeBtn}>Close</Text>
                                    </TouchableHighlight>
                                    </Modal>
                                  </View>
                                );
                              }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#223343',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 70,
    paddingHorizontal: 20
  },
  title: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  title2: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchbox: {
    fontSize: 20,
    fontWeight: '300',
    padding: 20,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 40
  },
  results: {
    flex: 1,
  },
  result: {
    flex: 1,
    width: '100%',
    marginBottom: 20
  },
  heading: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    padding: 20,
    backgroundColor: '#445565'
  },
  popup: {
    padding: 20,
  },
  poptitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 5,
  },
  closeBtn: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    padding: 20,
    backgroundColor: '#2484c4'
  },
});
