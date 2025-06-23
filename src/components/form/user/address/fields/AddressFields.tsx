import formStyles from '@components/form/registration/registration.module.scss';
import inputStyles from '@/components/form/input/input.module.scss';
import Input from '@/components/form/input/Input';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { TUserFormFields } from '../../validation-scheme';

type AddressKeys = 'address' | 'billing' | `addresses.${number}`;

type AddressFormErrors<K extends AddressKeys> = K extends 'address'
  ? NonNullable<FieldErrors<TUserFormFields>['address']>
  : K extends 'billing'
    ? NonNullable<FieldErrors<TUserFormFields>['billing']>
    : K extends `addresses.${number}`
      ? NonNullable<FieldErrors<TUserFormFields>['addresses']>[number]
      : never;

interface AddressFormFieldsProps<K extends AddressKeys> {
  prefix: K;
  errors?: AddressFormErrors<K>;
  register: UseFormRegister<TUserFormFields>;
}

const AddressFormFields = <K extends AddressKeys>({ prefix, errors, register }: AddressFormFieldsProps<K>) => {
  return (
    <>
      <div className={formStyles['input-wrapper-row']}>
        <div className={formStyles['input-wrapper']}>
          <Input
            {...register(`${prefix}.streetName`)}
            id="address-street"
            label="Street"
            placeholder="123 Maple Street"
            error={errors?.streetName?.message}
          />
        </div>
        <div className={formStyles['input-wrapper']}>
          <Input
            {...register(`${prefix}.city`)}
            id="address-city"
            label="City"
            placeholder="Anytown"
            error={errors?.city?.message}
          />
        </div>
      </div>

      <div className={formStyles['input-wrapper-row']}>
        <div className={formStyles['input-wrapper']}>
          <Input
            maxLength={5}
            {...register(`${prefix}.postalCode`)}
            id="address-zip"
            label="Postal Code"
            placeholder="12345"
            error={errors?.postalCode?.message}
          />
        </div>
        <div className={formStyles['input-wrapper']}>
          <label htmlFor="address-country">Country</label>
          <select {...register(`${prefix}.country`)} className={inputStyles.input} id="address-country">
            <option value="select" disabled>
              Select Country
            </option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
          </select>
          <span className={formStyles['input-error']}> {errors?.country?.message} </span>
        </div>
      </div>
    </>
  );
};

export default AddressFormFields;
