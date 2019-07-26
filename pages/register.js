import {  PureComponent, Fragment } from 'react';
import { Form, Input, Icon, Button, Breadcrumb } from 'antd';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {userRegister} from '../api';
import { message } from 'antd';
import Router from 'next/router';
import { getRandomColor } from '../utils';
import Link from 'next/link';


class Register extends PureComponent {
  static propTypes = {
    form:PropTypes.object.isRequired
  }
  handleSubmit = e => {
    const {form} = this.props;
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (err) {
        return;
        // console.log('Received values of form: ', values);
      }
      values.avatar = getRandomColor();
      const data = await userRegister(values);
      if (data.success) {
        message.success('注册成功，欢迎来到不bibi，也请别bibi');
        Router.push('/Login');
      } else {
        message.error(data.message);
      }
      
    });
  };
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };
  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Fragment>
        <div className='main-inside-container'>
          <Breadcrumb style={{marginTop: '10px'}}>
            <Breadcrumb.Item>
              <Link href={`/`}>
                <a>首页</a>
              </Link>
                 
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link href={`/register`}>
                <a>注册</a>
              </Link>
                 
            </Breadcrumb.Item>
          </Breadcrumb>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Form onSubmit={this.handleSubmit}  className='login-form'>
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input
                    prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder='用户名'
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input.Password 
                    prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type='password'
                    placeholder='密码'
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('confirm', {
                  rules: [{ required: true, message: 'Please input your Password!' },
                    {
                      validator: this.compareToFirstPassword,
                    }],
                })(
                  <Input.Password 
                    prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type='confirm'
                    placeholder='确认密码'
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: 'Please input your Email' }],
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
                注册
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default Form.create({ name: 'nobibi_login' })(connect(state => state)(Register));