
/**
 * @author Muhammad Adnan <adnannandeem1994@gmail.com>
 * @date   2021/11/12
 *
 * This class help to init select2 ajax
 */


class Select2Ajax
{
    element;
    url;
    instance;
    options;
    resultFormat;

    constructor(element, url)
    {
        this.element = element;
        this.url = url;
        // init settings
        this.settingsInit();
    }

    settingsInit()
    {
        this.options = {
            minimumInputLength: 2,
            placeholder: "Search a joey to assign",
            url: "",
            dataType: 'json',
            delay: 400,
            cache: true,
            columns:['first_name', 'last_name', 'id'],
            class:"joeys",
            extra_query_prams:{},
            resultFormat: function(data) {
                return {text: data.first_name+' '+data.first_name , id: data.id};
            },
        }
    }

    SelectInit()
    {
        // scoping the result fn
        let processResultsFn =  this.options.resultFormat;
        let options = this.options;

        this.instance = $(this.element).select2({
            minimumInputLength: this.options.minimumInputLength,
            placeholder: this.options.placeholder,
            ajax: {
                url: this.url,
                dataType: this.options.dataType,
                delay: this.options.delay,
                cache: this.options.cache,
                data: function (params) {
                    var query = {
                        q: params.term,
                        columns: options.columns,
                        class: options.class,
                        extra_query_prams: options.extra_query_prams,
                    }

                    return query;
                },
                transport: function (params, success, failure) {
                    var $request = $.ajax(params);
                    $request.then(success);
                    $request.fail(function(failure){
                        alert('Something went wrong');
                        console.log(failure);
                    });

                    return $request;
                },
                processResults: function (data) {
                    let result = [];
                    if(data.status)
                    {
                        // lopping up data
                        result = data.body.map(processResultsFn);
                    }
                    else // error catching
                    {
                        alert('Something went wrong');
                        console.log(data);

                    }
                    return {results : result};
                },

            }

        });

        return this;
    }

    SetOptions(key , value)
    {
        this.options[key] = value;
    }

}
