import { NextPage } from 'next';
import PropTypes from 'prop-types';
import {Form, Button, Input} from 'antd';
const { TextArea } = Input;

interface EditorProps {
  onChange: (e: any) => void;
  onSubmit: (e: React.MouseEvent<HTMLInputElement>) => void;
  submitting: boolean,
  value: any
}

const Editor: NextPage<EditorProps> = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType='submit' loading={submitting} onClick={onSubmit} type='primary'>
        评论
      </Button>
    </Form.Item>
  </div>
);



Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  value: PropTypes.string
};
Editor.defaultProps = {
  value: ''
};

export default Editor;

  