import { UsersThree } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

import Swipeout from "react-native-swipeout";

export const SwipeoutContainer = styled(Swipeout)`
  height: 90px;
  margin-bottom: 12px;
`

export const RemoveButton = styled.View`
  border-radius: 6px;
  background-color: #BB2525;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const RemoveText = styled.Text`
  color: white;
  font-weight: bold;
`

export const Container = styled(TouchableOpacity)`
  width: 100%;

  background-color: ${({ theme }) => theme.COLORS.GRAY_500};
  border-radius: 6px;

  flex-direction: row;
  align-items: center;
  padding: 24px;
`

export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.GRAY_200};
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `}

`

export const Icon = styled(UsersThree).attrs(({ theme }) => ({
  size: 32,
  color: theme.COLORS.GREEN_700,
  weight: 'fill'
}))`
  margin-right: 20px;
`

