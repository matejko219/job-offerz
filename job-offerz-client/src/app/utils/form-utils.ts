/**
 * Created by DELL on 2017-11-06.
 */
export class FormUtils {
  public static checkInputLength = (event, maxLength) => {
    if (event.which < 0x20) return;
    if (event.target.value.length == maxLength) {
      event.preventDefault();
    } else if (event.target.value.length > maxLength) {
      event.target.value = event.target.value.substring(0, maxLength);
    }
  }
}
