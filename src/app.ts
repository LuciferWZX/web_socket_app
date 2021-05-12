import store from 'storejs';
import { SocketProperty } from './type';
export async function getInitialState(): Promise<SocketProperty | null> {
  const socketProperty: SocketProperty | undefined =
    store.get('socketProperty');
  console.log(123, socketProperty);
  if (socketProperty) {
    return {
      address: socketProperty.address,
      token: socketProperty.token,
    };
  }
  return null;
}
