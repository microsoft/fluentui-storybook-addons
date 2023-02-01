import * as React from 'react';
import { Button, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  greenButton: {
    color: 'green',
  },
});

export const ButtonAppearance = () => {
  const styles = useStyles();

  return (
    <>
      <Button>Default button</Button>
      <Button appearance="primary">Primary button</Button>
      <Button appearance="outline">Outline button</Button>
      <Button appearance="subtle">Subtle button</Button>
      <Button appearance="transparent">Transparent button</Button>
      <Button className={styles.greenButton}>Custom green button</Button>
    </>
  );
};

ButtonAppearance.parameters = {
  docs: {
    description: {
      story:
        '- `(undefined)`: the button appears with the default style\n' +
        '- `primary`: emphasizes the button as a primary action.\n' +
        '- `outline`: removes background styling.\n' +
        '- `subtle`: minimizes emphasis to blend into the background until hovered or focused\n' +
        '- `transparent`: removes background and border styling.\n',
    },
  },
};
