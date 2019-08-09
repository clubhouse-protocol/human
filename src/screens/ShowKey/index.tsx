import React, { FunctionComponent, useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Platform, Dimensions } from 'react-native';
import { NavigationInjectedProps, NavigationParams } from 'react-navigation';
import useChannel from '../../hooks/useChannel';
import { loadIdentity } from 'clubhouse-protocol';
import useIdentity from '../../hooks/useIdentity';

const HeaderHeight = 64;
const Wrapper = styled.View`
  ${() => (Platform.OS === 'web' ? `min-height: ${Dimensions.get('window').height - HeaderHeight}px;` : '')}
`;

const PublicKey = styled.TextInput`
  flex: 1;
`;

const ShareKey: FunctionComponent<NavigationInjectedProps<NavigationParams>> = ({
  navigation,
}) => {
  const identity = useIdentity();

  return (
    <Wrapper>
      <PublicKey
        value={identity.publicKey.armor()}
        multiline
        numberOfLines={20}
      />
    </Wrapper>
  );
};

export default ShareKey;
