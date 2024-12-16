export const displayDialogAsync = (
  startAddress: string,
  options: Office.DialogOptions,
  onSuccess?: (message: string) => void,
  onError?: (error: any) => void,
  onEnd?: () => void
) =>
  Office.context.ui.displayDialogAsync(startAddress, options, (showDialogResult) => {
    /**
     * The following are errors resulting from the attempt to show the dialog.
     * A successful result will be emitted if the dialog was successfully displayed
     * and is now visible to the user.
     */
    if (showDialogResult.status == Office.AsyncResultStatus.Failed) {
      // In addition to general system errors, there are 3 specific errors for
      // displayDialogAsync that you can handle individually.
      switch (showDialogResult.error.code) {
        case 12004:
          console.log("Domain is not trusted");
          break;
        case 12005:
          console.log("HTTPS is required");
          break;
        case 12007:
          console.log("A dialog is already opened.");
          break;
        default:
          console.log(showDialogResult.error.message);
          onError && onError(showDialogResult.error);
          break;
      }
    } else {
      const dialog = showDialogResult.value;
      const messageHandler = ({ message }: any) => {
        onSuccess && onSuccess(message);
        dialog.close(); // notify the parent dialog is closed
        if (onEnd) onEnd();
      };
      const eventHandler = (arg: any) => {
        // In addition to general system errors, there are 2 specific errors
        // and one event that you can handle individually.
        switch (arg.error) {
          case 12002:
            console.error("Cannot load URL, no such page or bad URL syntax.");
            break;
          case 12003:
            console.error("HTTPS is required.");
            break;
          case 12006:
            // The dialog was closed, typically because the user the pressed X button.
            console.log("Dialog closed by user");
            break;
          default:
            console.error("Undefined error in dialog window");
            break;
        }
        if (onEnd) onEnd();
      };
      /*Messages are sent by developers programatically from the dialog using office.context.ui.messageParent(...)*/
      dialog.addEventHandler(Office.EventType.DialogMessageReceived, messageHandler);
      /*Events are sent by the platform in response to user actions or errors. For example, the dialog is closed via the 'x' button*/
      dialog.addEventHandler(Office.EventType.DialogEventReceived, eventHandler);
    }
  });
