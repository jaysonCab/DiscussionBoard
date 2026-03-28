/* FlatList loops through arrays, like what is stored in database */
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Modal,
  FlatList
} from 'react-native';

/* useState remembers ui data over time, useEffect code runs when something happens like trigger*/
import { useState, useEffect } from 'react';
import { styles } from './styles/styles';

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
  handleSubmitPost,
  editingPostId,
  setEditingPostId,
  viewingPost,
  setViewingPost,
}) {
  return (
    <Modal
      visible={modalVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => {
        setModalVisible(false);
        setViewingPost(false);
      }}
    >
      <View style={styles.modalBackground}>
        <View style={styles.formBox}>
          <Text style={styles.formTitle}>
            {viewingPost
              ? 'View Post'
              : editingPostId
              ? 'Edit Post'
              : 'One Piece Discussion Board'}
          </Text>

          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter title"
            placeholderTextColor="#777"
            editable={!viewingPost}
          />

          <Text style={styles.label}>Author</Text>
          <TextInput
            style={styles.input}
            value={author}
            onChangeText={setAuthor}
            placeholder="Enter author"
            placeholderTextColor="#777"
            editable={!viewingPost}
          />

          <Text style={styles.label}>Episode</Text>
          <TextInput
            style={styles.input}
            value={episodeNumber}
            onChangeText={setEpisodeNumber}
            placeholder="Enter episode number"
            placeholderTextColor="#777"
            keyboardType="numeric"
            editable={!viewingPost}
          />

          <Text style={styles.label}>Content</Text>
          <TextInput
            style={styles.textArea}
            value={content}
            onChangeText={setContent}
            placeholder="Write your opinion"
            placeholderTextColor="#777"
            multiline={true}
            editable={!viewingPost}
          />

          {/* Only show submit/update button if user is NOT just viewing */}
          {!viewingPost && (
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmitPost}
            >
              <Text style={styles.buttonText}>
                {editingPostId ? 'Update Post' : 'Submit Post'}
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => {
              /* Clear all form values when modal closes */
              setTitle('');
              setAuthor('');
              setEpisodeNumber('');
              setContent('');
              setEditingPostId(null);
              setViewingPost(false);
              setModalVisible(false);
            }}
          >
            <Text style={styles.buttonText}>
              {viewingPost ? 'Close' : 'Cancel'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

/* Primary Screen Display */
export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [episodeNumber, setEpisodeNumber] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);

  /* viewingPost tells modal whether to be read-only for GET /api/:id */
  const [viewingPost, setViewingPost] = useState(false);

  async function fetchPosts() {
    const response = await fetch('http://localhost:3000/api');
    const data = await response.json();
    console.log('FETCHED DATA:', data);
    setPosts(data);
  }

  // Run once when screen loads with useEffect
  useEffect(() => {
    fetchPosts();
  }, []);

  async function handleCreatePost() {
    /* Basic validation so empty values are not submitted */
    if (!title || !author || !episodeNumber || !content) {
      alert('Please fill in all fields.');
      return;
    }

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
    setEditingPostId(null);
    setViewingPost(false);
    setModalVisible(false);

    // fetchPosts refresh posts after creating one
    fetchPosts();
  }

  async function handleDeletePost(id) {
    const response = await fetch(`http://localhost:3000/api/${id}`, {
      method: 'DELETE',
    });

    const message = await response.text();
    console.log(message);

    fetchPosts();
  }

  /* handleEditPost loads existing values into the same modal form */
  function handleEditPost(post) {
    setTitle(post.TITLE);
    setAuthor(post.AUTHOR);
    setEpisodeNumber(post.EPISODE_NUMBER.toString());
    setContent(post.CONTENT);
    setEditingPostId(post.ID);

    /* This is edit mode, not view mode */
    setViewingPost(false);
    setModalVisible(true);
  }

  /* handleUpdatePost sends a PUT request to update one specific post */
  async function handleUpdatePost() {
    /* Basic validation so empty values are not submitted */
    if (!title || !author || !episodeNumber || !content) {
      alert('Please fill in all fields.');
      return;
    }

    const response = await fetch(`http://localhost:3000/api/${editingPostId}`, {
      method: 'PUT',
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
    setEditingPostId(null);
    setViewingPost(false);
    setModalVisible(false);

    // fetchPosts refresh posts after updating one
    fetchPosts();
  }

  /* handleViewPost uses GET /api/:id to load one specific post from backend */
  async function handleViewPost(id) {
    const response = await fetch(`http://localhost:3000/api/${id}`);
    const data = await response.json();

    console.log('SINGLE POST:', data);

    /* Load backend data into modal fields */
    setTitle(data.TITLE);
    setAuthor(data.AUTHOR);
    setEpisodeNumber(data.EPISODE_NUMBER.toString());
    setContent(data.CONTENT);

    /* This is only viewing, not editing */
    setEditingPostId(null);
    setViewingPost(true);
    setModalVisible(true);
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
          onPress={() => {
            /* Clear old values before opening create form */
            setTitle('');
            setAuthor('');
            setEpisodeNumber('');
            setContent('');
            setEditingPostId(null);
            setViewingPost(false);
            setModalVisible(true);
          }}
        >
          <Text style={styles.buttonText}>Create Post</Text>
        </TouchableOpacity>

        {/* Display all posts */}
        <FlatList
          style={{ width: '100%', flex: 1, marginTop: 20 }}
          data={posts}
          keyExtractor={(item) => item.ID.toString()}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.TITLE}</Text>
              <Text style={styles.cardText}>Author: {item.AUTHOR}</Text>
              <Text style={styles.cardText}>
                Episode: {item.EPISODE_NUMBER}
              </Text>
              <Text style={styles.cardText}>{item.CONTENT}</Text>

              {/* View button uses GET /api/:id */}
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleViewPost(item.ID)}
              >
                <Text style={styles.buttonText}>View Post</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleEditPost(item)}
              >
                <Text style={styles.buttonText}>Edit Post</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => handleDeletePost(item.ID)}
              >
                <Text style={styles.buttonText}>Delete Post</Text>
              </TouchableOpacity>
            </View>
          )}
        />
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
        handleSubmitPost={editingPostId ? handleUpdatePost : handleCreatePost}
        editingPostId={editingPostId}
        setEditingPostId={setEditingPostId}
        viewingPost={viewingPost}
        setViewingPost={setViewingPost}
      />
    </ImageBackground>
  );
}