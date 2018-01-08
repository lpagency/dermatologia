$(document).ajaxSuccess(function()
{
    if($('input[name=tags]').length){
        $('input[name=tags]').selectize({
            persist: false,
            maxItems: null,
            valueField: 'label',
            labelField: 'label',
            searchField: ['label'],
            options: [],
            render: {
                item: function(item, escape) {
                    return '<div class="g-contenedor-tag-seleccionado" >' +
                        '<div>' + escape(item.label) + '</div>'+
                    '</div>';
                },
                option: function(item, escape) {
                    return '<div >' +
                        '<span class="caption" style="color:gray;">' + escape(item.label) + '</span>' +
                    '</div>';
                }
            },
            load: function(input, callback)
            {

                var self = this;
                var options = [];

                $.get( 
                    site_base + "/tag/autocomplete?search_query=" + input,
                    function(data)
                    {
                        var json = $.parseJSON(data);

                        for (var i = 0; i < json.length; i++) {
                            options.push({
                                "label" : json[i].label
                            });
                        }

                        callback(options);

                    });
            },
            createFilter: function(input) {
                return true;
            },
            create: function(input) {
                return { label: input };
            }
        });
    }
});