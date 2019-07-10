import {  PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Form, Upload, Icon, message, Input, Button } from 'antd';
import {connect} from 'react-redux';
import NoAvatar from '../components/NoAvatar';
import { modifyUserApi } from '../api';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

class ModifyUser extends PureComponent {
    static propTypes = {
      form:PropTypes.object.isRequired,
      userInfo: PropTypes.object.isRequired
    }
    state = {
      imageUrl: '',
      loading: false,
    };
  
    handleChange = info => {
      if (info.file.status === 'uploading') {
        this.setState({ loading: true });
        getBase64(info.file.originFileObj, imageUrl =>
          this.setState({
            imageUrl,
            loading: false,
          }),
        );
      }
    };
    handleSubmit = e => {
      const {form, userInfo} = this.props;
      const { imageUrl } = this.state;
      e.preventDefault();
      form.validateFields(async (err, values) => {
        if (err) {
          return;
          // console.log('Received values of form: ', values);
        }
        const _params = {...values, _id: userInfo._id};
        if (imageUrl) {
          _params.avatar = imageUrl;
        }
        const { success } = await modifyUserApi(_params);
        if (success) {
          message.success('修改成功!');
        }
     

      });
    };
    render() {
      const { form, userInfo } = this.props;
      const { getFieldDecorator } = form;
      const { imageUrl } = this.state;
      const uploadButton = (
        <div>
          {/* <Icon type={this.state.loading ? 'loading' : 'plus'} />
          <div className='ant-upload-text'>Upload</div> */}
          <NoAvatar
            avatar={userInfo.avatar}
            userName={userInfo.userName}
            size={64}
          />
        </div>
      );
   
      return (
        <Fragment>
          <Form onSubmit={this.handleSubmit}  className='login-form' >
            <Form.Item style={{display:'flex', alignItems: 'center', flexDirection:'column'}}>
              <Upload
                name='avatar'
                listType='picture-card'
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
              >
                {imageUrl ? <img style={{width: '64px', height: '64px', borderRadius: '64px'}} src={imageUrl} alt='avatar' /> : uploadButton}
              </Upload>
             
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('username', {
                initialValue: userInfo.userName,
                rules: [{ required: true, message: '请输入用户名!' }],
              })(
                <Input
                  prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder='用户名'
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('email', {
                initialValue: userInfo.email,
                rules: [{ required: true, message: '请输入邮箱!' }],
              })(
                <Input
                  prefix={<Icon type='mail' style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type='email'
                  placeholder='邮箱'
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit' className='login-form-button'>
                修改
              </Button>
            </Form.Item>
          </Form>
        </Fragment>
      );
    }
}

export default Form.create({ name: 'modify_user' })(connect(state => ({
  userInfo: state.user.userInfo
}))(ModifyUser));