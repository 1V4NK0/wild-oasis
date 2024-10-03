import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings";
import Spinner from "../../ui/Spinner";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfast,
    } = {}, //this is in case when values are not yet loaded
  } = useSettings();
  //NESTED destructuring!!!

  const { isUpdating, updateSetting } = useUpdateSetting();

  const handleUpdate = (e, field) => {
    const { value } = e.target;

    if (!value) return;

    updateSetting({ [field]: value });
  };
  if (isLoading) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
          disabled={isUpdating}
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
          disabled={isUpdating}
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
          disabled={isUpdating}
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          onBlur={(e) => handleUpdate(e, "breakfast")}
          disabled={isUpdating}
          type="number"
          id="breakfast-price"
          defaultValue={breakfast}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
