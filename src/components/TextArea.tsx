import { styled } from '../../stitches.config';
  // TODO FIX PRIMARY ERROR

const TextArea = styled('textarea', {
  // base styles
  padding: '1rem 1.6rem',
  fontWeight: '400',
  backgroundColor: '$primary',
  borderRadius: '0.4rem',
  outline: 'none',
  border: 'none',
  transition: 'ease 250ms opacity',
  cursor: 'pointer',
  color: '$white',
  fontSize: '$2',
  height: '20rem',
  
  // '&:hover': {
  //   opacity: '0.8',
  // },


  variants: {
    color: {
      primary: {backgroundColor: '$primary', color: '#fff', border: '1px solid $primary','&:focus': {backgroundColor: '#333'}},
      secondary: {backgroundColor: '$secondary', color: '#fff',  border: '1px solid $secondary','&:focus': {backgroundColor: '#333'}},
    },

    bordered: {
      true: {backgroundColor: 'none'},
    },

    fullWidth: {
      true: {
        width: '100%',
      }
    },

    size: {
      small: {
        fontSize: '1.4rem',
        padding: '1.6rem 1.2rem',

        '@bp2': {
          fontSize: '1.6rem',
          padding: '1.6rem 1.2rem',
        }
      },
      medium: {
        fontSize: '1.6rem',
        padding: '1rem 1.6rem',

        '@bp2': {
          fontSize: '1.6rem',
          padding: '1rem 1.6rem'
        }
      },
      large: {
        fontSize: '1.6rem',
        padding: '1rem 1.6rem',

        '@bp2': {
          fontSize: '2rem',
          padding: '1.2rem 1.6rem'
        }
      },
    },
  },
  defaultVariants: {
    color: 'secondary',
    bordered: false,
    size: 'medium',
  }
});

export default TextArea;