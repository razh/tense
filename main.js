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
  TextInput,
  View,
  YellowBox,
} = React;

const fontFamilies = require('./font-families');
const ExBoxes = require('./ExBoxes');
const ExPhotoGallery = require('./ExPhotoGallery');
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
  paragraph: {
    color: '#000',
    fontSize: 16,
    marginTop: 8,
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
  note: {
    color: '#333',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: HORIZ_SPACE,
  },
  code: {
    fontFamily: 'Menlo',
    fontSize: 15,
  },
  gallery: {
    flex: 0,
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  boxes: {
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  attribution: {
    color: '#999',
    fontWeight: '300',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 18,
    marginHorizontal: HORIZ_SPACE,
  },
  exponent: {
    color: '#777',
    fontWeight: '200',
    letterSpacing: 3,
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

  _handleColorSelected(color) {
    this.setState({ headerColor: color });
  }

  render() {
    const boxColors = [
      '#5ac8fa', '#ffcc00', '#ff9500', '#ff2d55', '#563b7e', '#007aff',
      '#4cd964', '#ff3b30', '#8e8e93',
    ];

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

        {/* Try editing this text and reloading your project in Exponent */}
        <Text style={styles.paragraph}>
          This is a simple example of what you can make with Exponent. Feel
          free to try modifying it and seeing what happens!
        </Text>

        {/* Photo gallery demo */}
        <Text style={styles.sectionTitle}>Photo Gallery</Text>
        <ExPhotoGallery style={styles.gallery} />

        {/* Bouncy boxes demo */}
        <Text style={styles.sectionTitle}>Interactive Components</Text>
        <ExBoxes
          colors={boxColors}
          onPressBoxBegin={() => this.setState({ isBoxPressed: true })}
          onPressBoxEnd={() => this.setState({ isBoxPressed: false })}
          onSelectColor={this._handleColorSelected.bind(this)}
          style={styles.boxes}
        />
        <Text style={styles.note}>
          Tap the boxes to change the color of the status bar. Press down
          and drag them to see them bounce back with spring physics.
        </Text>

        {/* Publishing instructions */}
        <Text style={styles.sectionTitle}>Publishing</Text>
        <Text style={styles.paragraph}>
          When you are ready to share what your work, run <Text style={styles.code}>exp publish</Text>.
          Give the link to someone who has the Exponent app and they'll be
          able to see what you've built.
        </Text>

        <Text style={styles.attribution}>
          Made for <Text style={styles.exponent}>EXPONENT</Text>
        </Text>

        {YellowBox}
      </ExScreen>
    );
  }
}

AppRegistry.registerComponent('main', () => FirstExperience);
