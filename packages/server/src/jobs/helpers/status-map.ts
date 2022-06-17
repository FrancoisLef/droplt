export const statusMap = (status: number): string => {
  switch (status) {
    case 0:
      return 'PAUSED';
    case 1:
    case 3:
    case 5:
      return 'QUEUED';
    case 2:
      return 'CHECKING';
    case 4:
      return 'DOWNLOADING';
    case 6:
      return 'PAUSED';
    default:
      return 'UNKNWON';
  }
};
