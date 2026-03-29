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
    backgroundColor: 'rgba(255,255,255,0.35)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 30,
    paddingHorizontal: 20,
  },

  title: {
    color: '#111',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },

  button: {
    backgroundColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  formBox: {
    width: 360,
    maxWidth: '100%',
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 16,
    padding: 22,
  },

  formTitle: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },

  label: {
    color: 'white',
    fontSize: 16,
    marginBottom: 6,
    fontWeight: '600',
  },

  input: {
    backgroundColor: 'white',
    color: 'black',
    width: '100%',
    padding: 12,
    marginBottom: 14,
    borderRadius: 10,
    fontSize: 15,
  },

  textArea: {
    backgroundColor: 'white',
    color: 'black',
    width: '100%',
    minHeight: 100,
    padding: 12,
    marginBottom: 16,
    borderRadius: 10,
    textAlignVertical: 'top',
    fontSize: 15,
  },

  cancelButton: {
    backgroundColor: '#555',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  card: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.88)',
    padding: 18,
    marginBottom: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },

  cardTitle: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  cardMeta: {
    color: 'black',
    fontSize: 15,
    marginBottom: 4,
    fontWeight: '500',
  },

  cardContent: {
    color: 'black',
    fontSize: 16,
    lineHeight: 22,
    marginTop: 10,
    marginBottom: 14,
  },

  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 4,
  },

  smallButton: {
    flex: 1,
    backgroundColor: 'black',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },

  deleteSmallButton: {
    flex: 1,
    backgroundColor: 'grey',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },

  smallButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },

  cardText: {
    color: 'black',
    fontSize: 16,
    marginBottom: 4,
  },

  regularText: {
    color: 'black',
  },
});