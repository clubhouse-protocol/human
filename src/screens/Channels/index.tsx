import React, { FunctionComponent, Fragment } from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { withNavigation, NavigationInjectedProps, NavigationParams } from 'react-navigation';
import useChannels from '../../hooks/useChannels';

const Wrapper = styled.TouchableOpacity`
`;

const Name = styled.Text`
`;

const Button = styled.Button`
`;

const Channels: FunctionComponent<NavigationInjectedProps<NavigationParams>> = ({
  navigation,
}) => {
  const { channels, addChannel } = useChannels();

  return (
    <Fragment>
      <Button title="Add" onPress={() => { addChannel('test') }} />
      <FlatList
        data={channels}
        renderItem={({ item }) => (
          <Wrapper
            onPress={() => {
              navigation.navigate({
                routeName: 'Channel',
                params: {
                  name: item.name,
                },
              });
            }}
          >
            <Name>{item.name}</Name>
          </Wrapper>
        )}
      />
    </Fragment>
  );
};

export default withNavigation(Channels);
