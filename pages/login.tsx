import React, { useState } from 'react';
import { NextPage } from 'next';
import { useDispatch } from 'react-redux'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Input, Checkbox, Button, Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import { userLogin } from '../api';
import { message } from 'antd';
import Router from 'next/router';
import Link from 'next/link';
import md5 from 'md5';


const Login: NextPage<{}> = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch()
  const handleSubmit = async (values) => {
    const _userInfo = await form.validateFields()
    _userInfo.password = md5(_userInfo.password);
    window.localStorage.setItem('userName', _userInfo.username);
    const { success, data } = await userLogin(_userInfo);
    if (success) {
      message.success('来了，您呐');
      window.localStorage.setItem('Token', data.token);
      dispatch({
        type: 'GET_USER_INFO',
        payload: {
          userName: _userInfo.username,
        },
      });
      Router.push('/');
    }
  };

  return (
    <div className='main-inside-container'>
      login
      <Breadcrumb style={{ marginTop: '10px' }}>
        <Breadcrumb.Item>
          <Link href={`/`}>
            <a>首页</a>
          </Link>

        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link href={`/login`}>
            <a>登录</a>
          </Link>

        </Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Form
          className='login-form'
          onFinish={handleSubmit}
          form={form}
        >
          <Form.Item
            name='username'
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input
              prefix={
                <UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              placeholder='用户名'
            />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[{ required: true, message: '请输入密码!' }]}>
            <Input
              prefix={
                <LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              type='password'
              placeholder='密码'
            />
          </Form.Item>
          <Form.Item>
            {/* <Link href='/'>
              <a>忘记密码</a>
            </Link> */}
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
            >登录</Button>或{' '}
            <Link href='/register'>
              <a>注册</a>
            </Link>

          </Form.Item>
        </Form>
      </div>
    </div>
  );
}




export default connect(state => state)(Login)

