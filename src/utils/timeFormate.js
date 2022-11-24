export const japaniLocalization = (time) => {

  const localization = time?.split(' ')[0]?.split('/')
  const strDate = `${localization[2]} 年  ${localization[1]} 月 ${localization[0]} 日 ${time?.split(' ')[1]}`;

  return strDate;
}