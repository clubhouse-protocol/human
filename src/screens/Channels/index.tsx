import React, { FunctionComponent } from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { withNavigation, NavigationInjectedProps, NavigationParams } from 'react-navigation';
import useData from '../../useData';

const Wrapper = styled.TouchableOpacity`
`;

const Name = styled.Text`
`;

const Channels: FunctionComponent<NavigationInjectedProps<NavigationParams>> = ({
  navigation,
}) => {
  const data = useData();
  const channels = data.channels ? Object.keys(data.channels) : [];

  return (
    <FlatList
      data={channels}
      renderItem={({ item }) => (
        <Wrapper
          onPress={() => {
            navigation.navigate({
              routeName: 'Channel',
              params: {
                name: item,
              },
            });
          }}
        >
          <Name>{item}</Name>
        </Wrapper>
      )}
    />
  );
};

export default withNavigation(Channels);
