import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Modal,
} from 'react-native';
import { useState } from 'react';
import { styles } from './styles/styles';

/* ---------------- Modal Component ---------------- */
/* Modals are overlays placed on a layer above the screen*/
function CreatePostModal({
  modalVisible,
  setModalVisible,
  title,
  setTitle,
  author,
  setAuthor,
  episodeNumber,
  setEpisodeNumber,
  content,
  setContent,
  handleCreatePost,
}) {
  return (
    <Modal
      visible={modalVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.formBox}>
          <Text style={styles.formTitle}>One Piece Discussion Board</Text>

          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter title"
            placeholderTextColor="#777"
          />

          <Text style={styles.label}>Author</Text>
          <TextInput
            style={styles.input}
            value={author}
            onChangeText={setAuthor}
            placeholder="Enter author"
            placeholderTextColor="#777"
          />

          <Text style={styles.label}>Episode</Text>
          <TextInput
            style={styles.input}
            value={episodeNumber}
            onChangeText={setEpisodeNumber}
            placeholder="Enter episode number"
            placeholderTextColor="#777"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Content</Text>
          <TextInput
            style={styles.textArea}
            value={content}
            onChangeText={setContent}
            placeholder="Write your opinion"
            placeholderTextColor="#777"
            multiline={true}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleCreatePost}
          >
            <Text style={styles.buttonText}>Submit Post</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

/* ---------------- Main Screen ---------------- */
export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [episodeNumber, setEpisodeNumber] = useState('');
  const [content, setContent] = useState('');

  async function handleCreatePost() {
    const response = await fetch('http://localhost:3000/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        TITLE: title,
        AUTHOR: author,
        EPISODE_NUMBER: parseInt(episodeNumber),
        CONTENT: content,
      }),
    });

    const message = await response.text();
    console.log(message);

    setTitle('');
    setAuthor('');
    setEpisodeNumber('');
    setContent('');
    setModalVisible(false);
  }

  return (
    <ImageBackground
      source={require('./images/background.jpg')}
      style={styles.container}
      imageStyle={styles.bgImage}
      resizeMode="cover"
      blurRadius={8}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>One Piece Discussion Board</Text>

        {/* TouchableOpacity makes it so when click theres some sort of visual queue */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Create Post</Text>
        </TouchableOpacity>
      </View>

      <CreatePostModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        episodeNumber={episodeNumber}
        setEpisodeNumber={setEpisodeNumber}
        content={content}
        setContent={setContent}
        handleCreatePost={handleCreatePost}
      />
    </ImageBackground>
  );
}