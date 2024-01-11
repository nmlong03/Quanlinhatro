<script setup>
import svgRequired from '@/assets/svg/required.svg';
//props
const props = defineProps({
    modelValue: {
        type: [String, Number],
        required: false,
        default: '',
    },
    placeholder: {
        type: String,
        required: false,
        default: '',
    },
    type: {
        type: String,
        required: false,
        default: 'text',
    },
    size: {
        type: String,
        validator: (value) => ['sm', 'md', 'lg'].includes(value),
        default: 'md',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    message: {
        type: String,
        required: false,
        default: '',
    },
    label: String,
    rounded: {
        type: Boolean,
        default: false,
    },
    autocomplete: {
        type: String,
        default: 'off',
    },
    error: {
        type: String,
        default: '',
    },
    required: {
        type: Boolean,
        default: false,
    },
    min: {
        type: Number,
    },
});
const emit = defineEmits(['update:modelValue', 'onBlur', 'onFocus']);

const isFocus = ref(false);

//computed
const classes = computed(() => {
    const errorClass = { '!tw-border-[#E14B4B] !tw-border-2': props.error };
    return { ...errorClass };
});

//methods
const updateInput = (event) => {
    emit('update:modelValue', event.target.value);
};
const handleFocus = (event) => {
    isFocus.value = true;
    emit('onFocus', event);
};
const handleBlur = (event) => {
    isFocus.value = false;
    emit('onBlur', event);
};
</script>
<template>
    <div class="tw-w-full">
        <div v-if="label" class="label-input tw-flex tw-gap-x-1 tw-pb-1"
            :class="{ '!tw-text-[rgba(60,60,67,0.42)]': disabled }">
            <span>{{ label }}</span>
            <svgRequired v-if="required" class="mt-1" />
        </div>
        <div class="s-input" :class="[
            classes,
            isFocus ? 'focus-input' : '',
            disabled ? '!tw-bg-[#7676801f] !tw-border-none' : '',
        ]">
            <div v-if="$slots.prepend" class="mr-2 tw-flex tw-items-center">
                <slot name="prepend"></slot>
            </div>
            <div :class="['tw-grow']">
                <input ref="input" :type="type" :min="min" :value="modelValue" :placeholder="placeholder"
                    :disabled="disabled" :autocomplete="autocomplete" @input="updateInput($event)" @focus="handleFocus"
                    @blur="handleBlur" class="!tw-h-full !tw-w-full"
                    :class="disabled ? 'tw-text-[rgba(60,60,67,0.30)]' : ''" />
            </div>
            <div v-if="$slots.append" class="ml-2 tw-flex tw-items-center">
                <slot name="append"></slot>
            </div>
        </div>
        <p v-if="message" class="s-input__message tw-text-error tw-pl-3 tw-text-[12px]">
            {{ message }}
        </p>
        <p v-if="error" class="first-letter:tw-uppercase tw-text-[#E14B4B] tw-pt-1">
            {{ error }}
        </p>
    </div>
</template>
<style lang="scss" scoped>
@import url('./index.css');
</style>
