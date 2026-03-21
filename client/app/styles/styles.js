import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  bgImage: {
    resizeMode: 'cover',
  },

  overlay: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.4)', // Adjusted opacity white page on top layer
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },

  title: {
    color: 'black',
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },

  button: {
    backgroundColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
  },

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  formBox: {
    width: 350,
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'white',
    padding: 20,
  },

  formTitle: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },

  label: {
    color: 'white',
    fontSize: 18,
    marginBottom: 6,
  },

  input: {
    backgroundColor: 'white',
    color: 'black',
    width: '100%',
    padding: 10,
    marginBottom: 12,
  },

  textArea: {
    backgroundColor: 'white',
    color: 'black',
    width: '100%',
    minHeight: 100,
    padding: 10,
    marginBottom: 16,
    textAlignVertical: 'top',
  },

  cancelButton: {
    backgroundColor: '#444',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  }
});