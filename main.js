/**
 * This is the entry point for your experience that you will run on Exponent.
 *
 * Start by looking at the render() method of the component called
 * FirstExperience. This is where the text and example components are.
 */
'use strict';

const React = require('react-native');
const {
  AppRegistry,
  StatusBarIOS,
  StyleSheet,
  Text,
  View,
  YellowBox,
} = React;

const fontFamilies = require('./font-families');
const ExScreen = require('./ExScreen');
const SimpleMarkdownTextInput = require('./SimpleMarkdownTextInput');

const HORIZ_SPACE = 12;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    color: '#777',
    fontSize: 22,
    fontWeight: '300',
    marginTop: 16,
    marginHorizontal: HORIZ_SPACE,
  },
  text: {
    backgroundColor: '#000',
    color: '#fff',
    fontSize: 16,
    paddingTop: 8,
    paddingHorizontal: HORIZ_SPACE,
  },
  card: {
    backgroundColor: '#222',
    borderWidth: 0,
    margin: HORIZ_SPACE,
    marginBottom: 2 * HORIZ_SPACE,
    padding: HORIZ_SPACE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    borderRadius: 4,
  },
  cardText: {
    backgroundColor: 'transparent',
    color: '#fff',
    fontFamily: 'Avenir Next',
    fontSize: 16,
  },
});

const fontStyles = StyleSheet.create(fontFamilies.reduce((object, fontFamily) => {
  object[fontFamily] = { fontFamily };
  return object;
}, {}));

class FirstExperience extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      headerColor: '#007aff',
      isBoxPressed: false,
    };
  }

  componentDidMount() {
    if (StatusBarIOS) {
      StatusBarIOS.setStyle('light-content', true);
      StatusBarIOS.setHidden(false, 'fade');
    }
  }

  render() {
    return (
      <ExScreen
        title="tense"
        headerColor={this.state.headerColor}
        scrollEnabled={!this.state.isBoxPressed}
        style={styles.container}
      >

        <View style={styles.card}>
          <Text style={styles.cardText}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Similique neque, ipsam ipsa temporibus, fuga magni at cumque
            voluptate dolor reiciendis ea, unde nesciunt quod optio possimus
            nihil ducimus debitis harum?
          </Text>
        </View>

        <SimpleMarkdownTextInput style={styles.cardText} />

        {Object.keys(fontStyles).map(style =>
          <View>
            <Text style={[styles.text, fontStyles[style]]}>
              {style}
            </Text>

            <Text style={[styles.text, fontStyles[style]]}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Similique neque, ipsam ipsa temporibus, fuga magni at cumque
              voluptate dolor reiciendis ea, unde nesciunt quod optio possimus
              nihil ducimus debitis harum?
            </Text>
          </View>
        )}

        {YellowBox}
      </ExScreen>
    );
  }
}

AppRegistry.registerComponent('main', () => FirstExperience);
