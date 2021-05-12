import React, { FC } from 'react';
import { Form, Input, Modal } from 'antd';
import { useSelector } from '@@/plugin-dva/exports';
import { ConnectState } from '@/models/connect';
import { useDispatch } from 'umi';
import store from 'storejs';
import { TokenItem } from '@/type';
import { ExclamationCircleOutlined } from '@ant-design/icons';
interface FormProps {
  name: string;
  token: string;
}
const AddTokenModal: FC = () => {
  const [form] = Form.useForm<FormProps>();
  const dispatch = useDispatch();
  const { addTokenModalVisible: visible, tokenList } = useSelector(
    (state: ConnectState) => state.layout,
    (left, right) => {
      return (
        left.addTokenModalVisible === right.addTokenModalVisible &&
        left.tokenList === right.tokenList
      );
    },
  );
  const handleCancel = () => {
    dispatch({
      type: 'layout/save',
      payload: {
        addTokenModalVisible: false,
      },
    });
  };
  const onFinish = (values: FormProps): void => {
    const list: TokenItem[] | undefined = store.get('tokenList');
    if (list && list.find((item) => item.name === values.name)) {
      Modal.confirm({
        title: (
          <div>
            别名
            <span style={{ color: 'rgba(46, 134, 222,1.0)' }}>
              {values.name}
            </span>
            已存在，是否替换？
          </div>
        ),
        icon: <ExclamationCircleOutlined />,
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          const newList = tokenList.map((item) => {
            if (item.name === values.name) {
              return {
                ...item,
                token: values.token,
              };
            }
          });
          dispatch({
            type: 'layout/save',
            payload: {
              tokenList: newList,
            },
          });
          store.set('tokenList', newList);
          handleCancel();
        },
      });
    } else {
      const newList = tokenList.concat(values);
      dispatch({
        type: 'layout/save',
        payload: {
          tokenList: newList,
        },
      });
      store.set('tokenList', newList);
      handleCancel();
    }
  };
  const afterClose = () => {
    form.resetFields();
  };
  const handleOk = (): void => {
    form.submit();
  };
  return (
    <div>
      <Modal
        title="添加Token"
        visible={visible}
        maskClosable={false}
        onOk={handleOk}
        onCancel={handleCancel}
        afterClose={afterClose}
      >
        <Form
          form={form}
          layout={'vertical'}
          onFinish={onFinish}
          initialValues={
            {
              name: '',
              token: '',
            } as FormProps
          }
        >
          <Form.Item
            label={'别名'}
            name={'name'}
            rules={[{ required: true, message: '请输入别名' }]}
          >
            <Input placeholder={'请输入'} />
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
        </Form>
      </Modal>
    </div>
  );
};
export default AddTokenModal;
