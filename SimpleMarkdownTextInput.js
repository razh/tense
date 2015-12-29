'use strict';

const React = require('react-native');
const {
  Text,
  TextInput,
  View,
  StyleSheet,
} = React;

const mdast = require('mdast');
const SimpleMarkdown = require('simple-markdown');
const mdParse = SimpleMarkdown.defaultBlockParse;

const styles = StyleSheet.create({
  multiline: {
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    flex: 1,
    fontSize: 13,
    height: 50,
    padding: 4,
    marginBottom: 4,
  },
  hashtag: {
    color: 'blue',
    fontWeight: 'bold',
  },
  json: {
    marginTop: 4,
    fontSize: 8,
    fontFamily: 'Menlo',
  },
});

/**
 * A TextInput with basic markdown syntax.
 */
class TokenizedTextExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Hello #World\n***\n' };
  }

  render() {
    // define delimiter
    const delimiter = /\s+/;

    // split string
    let _text = this.state.text;
    let token;
    let index;
    let parts = [];
    while (_text) {
      delimiter.lastIndex = 0;
      token = delimiter.exec(_text);
      if (token === null) {
        break;
      }
      index = token.index;
      if (token[0].length === 0) {
        index = 1;
      }
      parts.push(_text.substr(0, index));
      parts.push(token[0]);
      index = index + token[0].length;
      _text = _text.slice(index);
    }
    parts.push(_text);

    // highlight hashtags
    parts = parts.map((text) => {
      if (/^#/.test(text)) {
        return <Text key={text} style={styles.hashtag}>{text}</Text>;
      }

      return text;
    });

    return (
      <View>
        <TextInput
          multiline
          style={styles.multiline}
          onChangeText={(text) => this.setState({ text })}
        >
          <Text>{parts}</Text>
        </TextInput>

        <Text style={styles.json}>
          {JSON.stringify(mdast.parse(this.state.text), null, 2)}
        </Text>

        <Text style={styles.json}>
          {JSON.stringify(mdParse(this.state.text), null, 2)}
        </Text>
      </View>
    );
  }
}

module.exports = TokenizedTextExample;
