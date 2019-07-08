
import {  PureComponent } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import 'braft-editor/dist/index.css';
const BraftEditor = dynamic(
    import('braft-editor'),
    { ssr: false }
);
  

class TopicEditor extends PureComponent {
    static propTypes = {
      editorValue:PropTypes.object,
      editorChange: PropTypes.func.isRequired
    }
    static defaultProps = {
      editorValue: {}
    }
    render() {
      const {editorValue, editorChange} = this.props;
      return (
        <BraftEditor
          value={editorValue}
          onChange={editorChange}
          style={{border: '1px #dddddd solid', borderRadius: '2px'}}
        />
      );
    }
}

export default TopicEditor;