
export const Notification = ({ notification, isVisible }) => {
  const style = {
    fontSize: '30px',
    color: 'white',
    backgroundColor: 'green',
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  return isVisible && notification ? (
    <div style={style}>
      {notification}
    </div>
  ) : null;
};
