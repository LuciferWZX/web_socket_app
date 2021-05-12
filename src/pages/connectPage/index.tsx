import React, { FC } from 'react';
import { StyledConnect, StyledConnectForm } from './style';
import { Button, Form, Input } from 'antd';
import { history } from 'umi';
import store from 'storejs';
import { useModel } from '@@/plugin-model/useModel';
import { SocketProperty } from '@/type';
import { useMount } from 'ahooks';
interface FormProps {
  address: string;
  token: string;
}
const ConnectPage: FC = () => {
  const [form] = Form.useForm<FormProps>();
  const { setSocketProperty } = useModel('@@initialState', (model) => ({
    setSocketProperty: model.setInitialState,
  }));
  useMount(() => {
    const socketProperty: SocketProperty | undefined =
      store.get('socketProperty');
    if (socketProperty) {
      form.setFieldsValue({
        address: socketProperty.address,
        token: socketProperty.token,
      });
    }
  });
  const onFinish = (values: FormProps) => {
    console.log(values);
    setSocketProperty({
      address: values.address,
      token: values.token,
    });
    store.set('socketProperty', {
      address: values.address,
      token: values.token,
    });
    history.replace('/');
  };
  return (
    <StyledConnect>
      <StyledConnectForm>
        <Form
          layout={'vertical'}
          form={form}
          onFinish={onFinish}
          initialValues={
            {
              address: '',
              token: '',
            } as FormProps
          }
        >
          <Form.Item
            name={'address'}
            label={'连接IP地址'}
            rules={[
              { required: true, message: '请输入连接地址' },
              { whitespace: true, message: '请输入连接地址' },
            ]}
          >
            <Input size={'large'} placeholder={'连接地址'} />
          </Form.Item>
          <Form.Item
            name={'token'}
            label={'Token'}
            rules={[
              { required: true, message: '请输入Token' },
              { whitespace: true, message: '请输入Token' },
            ]}
          >
            <Input.TextArea
              autoSize={{ minRows: 1, maxRows: 4 }}
              size={'large'}
              placeholder={'Token'}
            />
          </Form.Item>
          <Form.Item noStyle={true}>
            <Button htmlType={'submit'} type={'primary'} block={true}>
              开始发送
            </Button>
          </Form.Item>
        </Form>
      </StyledConnectForm>
    </StyledConnect>
  );
};
export default ConnectPage;
