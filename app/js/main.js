 (function($){


	var sliderRev = $( "#slider-summ-rev" ),
		inpSliderRev = $("#summ-rev"),
		resulSliderRev = $(".ui-slider-handle"),
		rangeSliderRev = [
			inpSliderRev.data('start'),
			inpSliderRev.data('stop'),
			inpSliderRev.data('default')
		],
		moneyStepRev = inpSliderRev.data('moneystep'),

		sliderNomenclature = $('#slider-nomenclature'),
		inpSliderNomenclature = $("#nomenclature"),
		resulSliderNomenclature = $(".ui-slider-handle"),
		rangeSliderNomenclature = [
			inpSliderNomenclature.data('start'),
			inpSliderNomenclature.data('stop'),
			inpSliderNomenclature.data('default')
		],
		moneyStepNomenclature = inpSliderNomenclature.data('moneystep'),
		startAddNomenclature = inpSliderNomenclature.data('startadd'),

		sliderEmployees = $('#slider-employees'),
		inpSliderEmployees = $("#employees"),
		resulSliderEmployees = $(".ui-slider-handle"),
		rangeSliderEmployees = [
			inpSliderEmployees.data('start'),
			inpSliderEmployees.data('stop'),
			inpSliderEmployees.data('default')
		],
		moneyStepEmployees = inpSliderEmployees.data('moneystep'),

		sliderTransaction = $('#slider-transaction'),
		inpSliderTransaction = $("#transaction"),
		resulSliderTransaction = $(".ui-slider-handle"),
		rangeSliderTransaction = [
			inpSliderTransaction.data('start'),
			inpSliderTransaction.data('stop'),
			inpSliderTransaction.data('default')
		],
		moneyStepTransaction = inpSliderTransaction.data('moneystep'),

		typeBusinessSelect = $('#typeBusiness'),
		taxSystemSelect = $('#taxSystem'),
		supVedRadio = $('input[name=supVed]'),
		fromRev = $('#fromRev'),
		fromQuantity = $('#fromQuantity'),
		blkControll = $('.blkControll'),
		fromRevBlcks = $('.fromRev'),
		fromQuantityBlcks = $('.fromQuantity'),

		startupView = $('#sumStartup'),
		comfortView = $('#sumComfort'),
		premiumView = $('#sumPremium'),
		baceStartap = startupView.text()*1,
		baceComfort = comfortView.text()*1,
		bacePremium = premiumView.text()*1,
		typeCalc = 1,
		objAdd = {
			rev: {
				sumStartap: 0,
				sumComfort: 0,
				sumPremium: 0,
				count: 0,
				type: 1
			},
			typeBisnes: {
				sumStartap: 0,
				sumComfort: 0,
				sumPremium: 0,
				select: '',
				markup: 0,
				type: 3
			},
			supVed: {
				sumStartap: 0,
				sumComfort: 0,
				sumPremium: 0,
				select: '',
				markup: 0,
				type: 3
			},
			nomenclature: {
				sumStartap: 0,
				sumComfort: 0,
				sumPremium: 0,
				count: 0,
				type: 3
			},
			taxSystem: {
				sumStartap: 0,
				sumComfort: 0,
				sumPremium: 0,
				select: '',
				markup: 0,
				type: 3
			},
			employees:  {
				sumStartap: 0,
				sumComfort: 0,
				sumPremium: 0,
				count: 0,
				type: 3
			},
			transaction: {
				sumStartap: 0,
				sumComfort: 0,
				sumPremium: 0,
				count: 0,
				type: 2
			}

		};							

	var addSlider = function(blk,minMax,inp,views) {//функция иницилизации слайдера
	    blk.slider({
			range: "min",
			min: minMax[0],
			max: minMax[1],
			value: minMax[2],
			slide: function(event, ui) {
				inp.val(ui.value);
	   			blk.children('span').children('span').text(ui.value);
	   			inp.trigger('chengeval', [ui]);
			}
		});
	    blk.children('span').html('<span class="slider-flag">'+minMax[2]+'</span>');
	    inp.val(blk.slider("value"));

	    return blk;

	  };


	var updViewPrice = function(){
		var startapSum = 0,
			comfortSum = 0,
			premiumSum = 0;

		for (prop in objAdd ) {
			if(typeCalc === objAdd[prop].type || objAdd[prop].type === 3){	
				/*if(prop != 'rev' && prop != 'transaction'){
					startapSum += objAdd[prop].sumStartap;
				}*/

				comfortSum += objAdd[prop].sumComfort;
				premiumSum += objAdd[prop].sumPremium;
			}
		}
		startupView.text(baceStartap + startapSum);
		comfortView.text(baceComfort + comfortSum);
		premiumView.text(bacePremium + premiumSum);
	}



	

	$(document).ready(function() {
		var summRev = addSlider(sliderRev,rangeSliderRev,inpSliderRev,resulSliderRev),
			nomenclature = addSlider(sliderNomenclature,rangeSliderNomenclature,inpSliderNomenclature,resulSliderNomenclature),
			employees = addSlider(sliderEmployees,rangeSliderEmployees,inpSliderEmployees,resulSliderEmployees),
			transaction = addSlider(sliderTransaction,rangeSliderTransaction,inpSliderTransaction,resulSliderTransaction);


		inpSliderRev.on('chengeval', function(obj){
			var valInp = obj.target.value *1;
			objAdd.rev.count = valInp;
			objAdd.rev.sumStartap = moneyStepRev * (valInp -1);
			objAdd.rev.sumComfort = moneyStepRev * (valInp -1);
			objAdd.rev.sumPremium = moneyStepRev * (valInp -1);
			updViewPrice();
		});


		inpSliderNomenclature.on('chengeval', function(obj){
			var valInp = obj.target.value *1;
			objAdd.nomenclature.count = valInp;

			if(valInp > startAddNomenclature){
				objAdd.nomenclature.sumStartap = (baceStartap / 100) * moneyStepNomenclature;
				objAdd.nomenclature.sumComfort = (baceComfort / 100) * moneyStepNomenclature;
				objAdd.nomenclature.sumPremium = (bacePremium / 100) * moneyStepNomenclature;
			}else{
				objAdd.nomenclature.sumStartap = 0;
				objAdd.nomenclature.sumComfort = 0;
				objAdd.nomenclature.sumPremium = 0;
			}

			updViewPrice();
		});


		inpSliderEmployees.on('chengeval', function(obj){
			var valInp = obj.target.value *1;
			objAdd.employees.count = valInp;
			objAdd.employees.sumStartap = moneyStepEmployees * (valInp -1);
			objAdd.employees.sumComfort = moneyStepEmployees * (valInp -1);
			objAdd.employees.sumPremium = moneyStepEmployees * (valInp -1);
			updViewPrice();
		});


		inpSliderTransaction.on('chengeval', function(obj){
			var valInp = obj.target.value *1;
			objAdd.transaction.count = valInp;
			
			objAdd.transaction.sumStartap = moneyStepTransaction * (valInp -1);
			objAdd.transaction.sumComfort = moneyStepTransaction * (valInp -1);
			objAdd.transaction.sumPremium = moneyStepTransaction * (valInp -1);
			updViewPrice();
		});


		typeBusinessSelect.on('change', function(event) {
			event.preventDefault();
			var that = $(this).find('option:selected');

			objAdd.typeBisnes.select = that.val();
			objAdd.typeBisnes.markup = that.data('moneystep')*1;


			objAdd.typeBisnes.sumStartap = (baceStartap / 100) * objAdd.typeBisnes.markup;
			objAdd.typeBisnes.sumComfort = (baceComfort / 100) * objAdd.typeBisnes.markup;
			objAdd.typeBisnes.sumPremium = (bacePremium / 100) * objAdd.typeBisnes.markup;

			updViewPrice();
		});





		taxSystemSelect.on('change', function(event) {
			event.preventDefault();
			var that = $(this).find('option:selected');

			objAdd.taxSystem.select = that.val();
			objAdd.taxSystem.markup = that.data('moneystep')*1;


			objAdd.taxSystem.sumStartap = (baceStartap / 100) * objAdd.taxSystem.markup;
			objAdd.taxSystem.sumComfort = (baceComfort / 100) * objAdd.taxSystem.markup;
			objAdd.taxSystem.sumPremium = (bacePremium / 100) * objAdd.taxSystem.markup;

			updViewPrice();
		});

		supVedRadio.on('change', function(event) {
			event.preventDefault();
		
			var that = $(this);

			objAdd.supVed.select = that.val();
			objAdd.supVed.markup = that.data('moneystep')*1;


			objAdd.supVed.sumStartap = (baceStartap / 100) * objAdd.supVed.markup;
			objAdd.supVed.sumComfort = (baceComfort / 100) * objAdd.supVed.markup;
			objAdd.supVed.sumPremium = (bacePremium / 100) * objAdd.supVed.markup;
			
			updViewPrice();
		});


		fromRev.on('click', function(event) {
			event.preventDefault();
			/* Act on the event */
			var that = $(this);

			that.removeClass('btnDisabled');
			fromQuantity.addClass('btnDisabled');
			typeCalc = 1;
			fromRevBlcks.show('fast');
			fromQuantityBlcks.hide('fast');
			blkControll.show('fast');
			updViewPrice();
		});

		fromQuantity.on('click', function(event) {
			event.preventDefault();
			/* Act on the event */
			var that = $(this);

			that.removeClass('btnDisabled');
			fromRev.addClass('btnDisabled');
			typeCalc = 2;
			fromRevBlcks.hide('fast');
			fromQuantityBlcks.show('fast');

			blkControll.show('fast');
			updViewPrice();
		})

		 
		
		$(".fancybox").fancybox({
		    openEffect  : 'elastic',
		    closeEffect : 'none',
		    afterLoad   : function() {
		        this.content =  this.content.html();
		    }
		});

	});//end ready

})(jQuery);

