<template>
    <div v-bind:id="sliderId"></div>
</template>

<script>
    import noUiSlider from 'nouislider';

    export default {
        props: [
            'sliderStartValue',
            'sliderEndValue',
            'sliderRangeTooltip',
            'sliderSingleTooltip',
            'sliderMin',
            'sliderAvg',
            'sliderMax',
            'sliderStep',
            'sliderLowLimit',
            'sliderHighLimit',
            'showTooltips',
            'sliderDirection'
        ],
        data: function() {
            return {
                sliderId: this.uuid4(),
                slider: null,
                settings: {},
                isInnerChange: false
            }
        },

        watch: {
            sliderLowLimit(val, oldVal) {
                this.$nextTick(() => {
                    this.updateSlider();
                });
            },

            sliderHighLimit(val, oldVal) {
                this.$nextTick(() => {
                    this.updateSlider();
                });
            },

            sliderStartValue(val, oldVal) {
                this.$nextTick(() => {
                    this.updateSlider();
                });
            },

            sliderEndValue(val, oldVal) {
                this.$nextTick(() => {
                    this.updateSlider();
                });
            }
        },

        mounted: function() {
            this.slider = document.getElementById(this.sliderId);

            let range = {};

            if (
                typeof this.sliderMin != 'undefined'
                && this.sliderMin !== ''
                && this.sliderMin !== null
            ) {
                range = {
                    'min': this.sliderLowLimit,
                    '15%': this.sliderMin,
                    '50%': this.sliderAvg,
                    '90%': this.sliderMax,
                    'max': this.sliderHighLimit
                };
            }
            else {
                range = {
                    'min': this.sliderLowLimit,
                    'max': this.sliderHighLimit
                };
            }

            this.settings = {
                start: (
                    (
                        typeof this.sliderStartValue != 'undefined'
                        && this.sliderStartValue !== null
                        && this.sliderStartValue !== ''
                    )
                        ? [this.sliderStartValue, this.sliderEndValue]
                        : [this.sliderEndValue]
                ),
                step: this.sliderStep,
                behaviour: 'snap',
                animate: false,
                direction: (
                    typeof this.sliderDirection != 'undefined'
                        && this.sliderDirection
                        ? this.sliderDirection
                        : 'ltr'
                ),
                range
            };

            this.updateSlider();
        },
        methods: {
            updateSlider() {
                if (!this.isInnerChange) {
                    this.isInnerChange = true;

                    if (
                        typeof this.sliderStartValue != 'undefined'
                        && this.sliderStartValue !== null
                        && this.sliderStartValue !== ''
                    ) {
                        this.settings.connect = true;
                        this.settings.start = [this.sliderStartValue, this.sliderEndValue];
                    }
                    else {
                        this.settings.connect = false;
                        this.settings.start = [this.sliderEndValue];
                    }

                    if (
                        typeof this.sliderMin != 'undefined'
                        && this.sliderMin !== ''
                        && this.sliderMin !== null
                    ) {
                        this.settings.range = {
                            'min': this.sliderLowLimit,
                            '15%': this.sliderMin,
                            '50%': this.sliderAvg,
                            '90%': this.sliderMax,
                            'max': this.sliderHighLimit
                        };
                    }
                    else {
                        this.settings.range = {
                            'min': this.sliderLowLimit,
                            'max': this.sliderHighLimit
                        };
                    }

                    if (this.slider.noUiSlider) {
                        this.slider.noUiSlider.destroy();
                    }

                    noUiSlider.create(this.slider, this.settings);
                    this.slider.noUiSlider.on('update', this.onSliderUpdate);

                    // tooltips
                    //let tipHandles = $('.noUi-handle:last', this.$el);
                    let tipHandles = this.$el.querySelectorAll('.noUi-handle:last-of-type');

                    if (tipHandles.length) {
                        tipHandles.innerHTML += '<div id="js-price-slider-tooltip" class="tooltip"></div>';
                    }

                    // hide for empty field
                    if (!this.sliderEndValue) {
                        //$('.noUi-handle', this.$el).hide();
                        let tipHandles = this.$el.querySelectorAll('.noUi-handle:last-of-type').style.display = 'none';;
                    }

                    this.$nextTick(() => {
                        this.isInnerChange = false;
                    });
                }

                if (
                    typeof this.showTooltips != 'undefined'
                    && this.showTooltips
                ) {
                    // range
                    if (this.sliderStartValue) {
                        this.$el.parentElement.classList.add('priceRange');

                        if (
                            typeof this.sliderRangeTooltip != 'undefined'
                            && this.sliderRangeTooltip
                        ) {
                            this.$el.querySelector("#js-price-slider-tooltip").innerHTML = this.sliderRangeTooltip;
                        }
                    }

                    // single
                    else {
                        this.$el.parentElement.classList.remove("priceRange");

                        if (
                            typeof this.sliderSingleTooltip != 'undefined'
                            && this.sliderSingleTooltip
                        ) {
                            this.$el.querySelector("#js-price-slider-tooltip").innerHTML = this.sliderRangeTooltip;
                        }
                    }
                }
            },

            onSliderUpdate(values, handle) {
                if (!this.isInnerChange) {
                    this.isInnerChange = true;

                    if (this.sliderStartValue) {
                        if (handle == 0) {
                            this.sliderStartValue = values[handle];
                        }
                        else {
                            this.sliderEndValue = values[handle];
                        }
                    }
                    else {
                        this.sliderEndValue = values[handle];
                    }
                }

                this.$nextTick(() => {
                    this.isInnerChange = false;
                });
            },
            uuid4() {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
                    let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8)
                    return v.toString(16)
                })
            }
        }
    }
</script>