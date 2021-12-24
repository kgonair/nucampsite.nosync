import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  FlatList,
  Modal,
  Button,
  StyleSheet,
  Input
} from "react-native";
import { Card, Icon, Rating } from "react-native-elements";
import { CAMPSITES } from "../shared/campsites";
import { COMMENTS } from "../shared/comments";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postFavorite, postComment } from "../redux/ActionCreators";
import * as Animatable from 'react-native-animatable';
//import { Rating } from "react-native-ratings";

const mapStateToProps = (state) => {
  return {
    campsites: state.campsites,
    comments: state.comments,
    favorites: state.favorites,
    rating: state.rating,
  };
};

const mapDispatchToProps = {
  postFavorite: (campsiteId) => postFavorite(campsiteId),
  postComment: (campsiteId,rating,author,text) => postComment(campsiteId,rating,author,text)
};



function RenderCampsite(props) {
  const { campsite } = props;

  if (campsite) {
    return (
      <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
      <Card
        featuredTitle={campsite.name}
        image={{ uri: baseUrl + campsite.image }}
      >
        <Text style={{ margin: 10 }}>{campsite.description}</Text>
        <View style={styles.cardRow}>
          <Icon
            name={props.favorite ? "heart" : "heart-o"}
            icon={{ name: "pencil", type: "font-awesome", color: "#5637DD" }}
            type="font-awesome"
            color="#f50"
            raised
            reverse
            onPress={
              () => props.favorite ? console.log("Already set as a favorite"): props.markFavorite()
              //props.onShowModal()
            }
          />
          <Icon
            //name={props.favorite ? "heart" : "heart-o"}
            icon={{ name: "pencil", type: "font-awesome", color: "#5637DD" }}
            type="font-awesome"
            color="#5637DD"
            raised
            reverse
            onPress={() => props.onShowModal()}
          />
        </View>
      </Card>
      </Animatable.View>
    );
  }
  return <View />;
}


function RenderComments({ comments }) {

  const renderCommentItem = ({ item }) => {
    return (
      <View style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.text}</Text>
        <Rating
              showRating
              startingValue={item.rating}
              style={{ alignItems:'flex-start', paddingVertical: '5%' }}
              imageSize={10}
              readonly
              onFinishRating={(rating) => this.setState({ rating: rating })}
            />
        <Text
          style={{ fontSize: 12 }}
        >{`-- ${item.author}, ${item.date}`}</Text>
      </View>
    );
  };

  return (
    <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
    <Card title="Comments">
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </Card>
    </Animatable.View>
  );
}

class CampsiteInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: false,
      showModal: false,
      rating: '5',
      author: " ",
      text: " "
    };
  }

  markFavorite(campsiteId) {
    this.props.postFavorite(campsiteId);
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handleComment(campsiteId) {
    //console.log(JSON.stringify(this.state));
    postComment(campsiteId,this.rating,author,this.text);
    this.toggleModal();
  }

  resetForm() {
    this.setState({
      favorite: false,
      showModal: false,
      rating: 5,
      author: " ",
      text: " ",
    });
  }

  static navigationOptions = {
    title: "Campsite Information",
  };

  render() {
    const campsiteId = this.props.navigation.getParam("campsiteId");
    const campsite = this.props.campsites.campsites.filter(
      (campsite) => campsite.id === campsiteId
    )[0];
    const comments = this.props.comments.comments.filter(
      (comment) => comment.campsiteId === campsiteId
    );
    return (
      <ScrollView>
        <RenderCampsite
          campsite={campsite}
          favorite={this.props.favorites.includes(campsiteId)}
          markFavorite={() => this.markFavorite(campsiteId)}
        />
        <RenderComments comments={comments} />
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={() => this.toggleModal()}
        >
          <View style={styles.modal}>
            <Rating
              showRating
              startingValue={this.state.rating}
              style={{ paddingVertical: 10 }}
              imageSize={40}
              //readonly
              onFinishRating={(rating) => this.setState({ rating: rating })}
            />
            <Input
              placeholder="Author"
              leftIcon={{ type: "font-awesome", name: "author" }}
              leftIconContainerStyle={{ paddingVertical: 10 }}
              style={styles}
              onChangeText={(author) => this.setState({ author: author })}
            />
            <Input
              placeholder="Comment"
              leftIcon={{ type: "font-awesome", name: "comment" }}
              leftIconContainerStyle={{ paddingVertical: 10 }}
              style={styles}
              onChangeText={(comment) => this.setState({ comment: comment })}
            />
            <View>
              <Button
                 onPress={() => {
                  this.handleComment(campsiteId);
                  this.resetForm();
                }}
                title="Submit"
                color="#808080"
                accessibilityLabel="Tap me to cancel reservation"
              />
            </View>
            <View style={{ margin: 10 }}>
              <Button
                onPress={() => {
                  this.toggleModal();
                  this.resetForm();
                }}
                title="Cancel"
                color="#808080"
                accessibilityLabel="Tap me to cancel reservation"
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  cardRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 20,
  },
  modal: {
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CampsiteInfo);
