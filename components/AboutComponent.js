import React, { Component } from "react";
import { ScrollView, Text, FlatList } from "react-native";
import { Card, ListItem } from "react-native-elements";
// fetching the data from json-server via redux using "connect" function fron react-redux
import { connect } from "react-redux";
//base url constant, contains IP address of computer
import { baseUrl } from "../shared/baseUrl";
import Loading from './LoadingComponent';


/* mapStateToProps function recieves the state as a prop and returns 
a partner data from the state to signal only the necessary state being used i.e., partner's data*/
const mapStateToProps = (state) => {
  return {
    partners: state.partners,
  };
};

function Mission(props) {
  return (
    <Card title="Our Mission" wrapperStyle={{ margin: 20 }}>
      <Text style={{ margin: 10 }}>
        We present a curated database of the best campsites in the vast woods
        and backcountry of the World Wide Web Wilderness. We increase access to
        adventure for the public while promoting safe and respectful use of
        resources. The expert wilderness trekkers on our staff personally verify
        each campsite to make sure that they are up to our standards. We also
        present a platform for campers to share reviews on campsites they have
        visited with each other.
      </Text>
    </Card>
  );
}

class About extends Component {

  static navigationOptions = {
    title: "About Us",
  };

  render() {
    const renderPartner = ({item}) => {
        return (
            <ListItem
                title={item.name}
                subtitle={item.description}
                leftAvatar={{source: {uri: baseUrl + item.image}}}
            />
        );
    };

    if (this.props.partners.isLoading) {
        return (
            <ScrollView>
                <Mission />
                <Card
                    title='Community Partners'>
                    <Loading />
                </Card>
            </ScrollView>
        );
    }
    if (this.props.partners.errMess) {
        return (
            <ScrollView>
                <Mission />
                <Card
                    title='Community Partners'>
                    <Text>{this.props.partners.errMess}</Text>
                </Card>
            </ScrollView>
        );
    }
      return (
        <ScrollView/>
      );
  };

}

export default connect(mapStateToProps)(About);
