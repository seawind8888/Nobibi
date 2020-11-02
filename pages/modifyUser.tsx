import React, { useState } from 'react';
import { NextPage } from 'next';
import { UserOutlined } from '@ant-design/icons';
import { Form, Upload, message, Input, Button, Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import { getBase64, beforeUpload } from '../utils'
import NoAvatar from '../components/NoAvatar';
import { modifyUserApi } from '../api';
import { User } from '../@types'
import { AppStateType } from '../redux/reducers'
import Link from 'next/link';





interface ModifyUserProps {
  userInfo: User
}


const ModifyUser: NextPage<ModifyUserProps> = (props) => {
  const [form] = Form.useForm();
  const { userInfo } = props
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      getBase64(info.file.originFileObj, imageUrl => {
        setImageUrl(imageUrl)
        setLoading(false);
      })
    }
  };

  const handleSubmit = async () => {
    const fieldsValue = await form.validateFields()
    const _params: User = { ...fieldsValue, _id: userInfo._id };
    if (imageUrl) {
      _params.avatar = imageUrl;
    }
    const { success } = await modifyUserApi(_params);
    if (success) {
      message.success('修改成功!');
    }
  }

  const uploadButton = () => (
    <div>
      <NoAvatar
        avatar={userInfo.avatar}
        userName={userInfo.userName}
        size={64}
      />
    </div>
  );

  return (
    <div className='main-inside-container'>
      <Breadcrumb style={{ marginTop: '10px' }}>
        <Breadcrumb.Item>
          <Link href={`/`}>
            <a>首页</a>
          </Link>

        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link href={`/modifyUser`}>
            <a>修改资料</a>
          </Link>

        </Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Form
          className='login-form'
          onFinish={handleSubmit}
          form={form}
          initialValues={{
            username: userInfo.userName,
            email: userInfo.email
          }} >
          <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
            <Upload
              name='avatar'
              listType='picture-card'
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? <img style={{ width: '64px', height: '64px', borderRadius: '64px' }} src={imageUrl} alt='avatar' /> : uploadButton}
            </Upload>

          </Form.Item>
          <Form.Item
            name='username'
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder='用户名'
            />
          </Form.Item>
          <Form.Item
            name='email'
            rules={[{ required: true, message: '请输入邮箱!' }]}>
            <Input
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              type='email'
              placeholder='邮箱'
            />,
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' className='login-form-button'>
              修改
                  </Button>
          </Form.Item>
        </Form>
      </div>

    </div>
  );
}

const mapStateToProps = (state: AppStateType) => ({
  userInfo: state.user
});

export default connect(mapStateToProps)(ModifyUser);