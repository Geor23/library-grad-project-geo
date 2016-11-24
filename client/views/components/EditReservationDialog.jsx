var React = require('react');
var DatePicker = require('material-ui/DatePicker').default;
var Dialog = require('material-ui/Dialog').default;
var FlatButton = require('material-ui/FlatButton').default;

var EditReservationDialog = React.createClass({
    propTypes: {
        id: React.PropTypes.number,
        from: React.PropTypes.string.isRequired,
        to: React.PropTypes.string.isRequired
    },
    getInitialState: function() {
        return {
            id: this.props.id,
            from: this.props.from,
            to: this.props.to,
            minDate: this.props.from,
            maxDate: this.props.to,
            open: false
        };
    },
    startDialog: function() {
        this.setState({open: true});
    },
    closeDialog: function() {
        this.setState({open: false});
    },
    editReservation: function() {
        var data = {
            id: this.props.id,
            from: this.state.minDate,
            to: this.state.maxDate
        };

        console.log(data);

        // $.put('http://localhost:3333/api/bookreservations', data)
        //     .done(function() {
        //         alert("The reservation has been edited successfully");
        //     }).fail(function() {
        //         alert("ERROR");
        //     });

        this.setState({open: false});
    },
    handleChangeMinDate: function(event, date) {
        this.setState({
            minDate: date,
        });
    },
    handleChangeMaxDate: function(event, date) {
        this.setState({
            maxDate: date,
        });
    },
    render: function() {
        const actions = [
          <FlatButton
            label="CANCEL"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.closeDialog}
          />,
          <FlatButton
            label="SUBMIT"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.editReservation}
          />,
        ];
        var dialStyle = {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            textAlign: 'center',
            alignItems: 'center'
        };
        var elemStyle = {
            display: 'flex',
            flexDirection: 'column'
        };
        var fieldStyle = {
            display: "block",
            margin: 10
        };
        return (
            <Dialog
                title="Add reservation"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
                bodyStyle={dialStyle}
            >
                <div style={elemStyle}>
                    <p>{this.props.id}</p>
                    <DatePicker 
                        id='date' 
                        value={new Date(this.state.minDate)} 
                        onChange={this.handleChangeMinDate} 
                        hintText="Publish Date" 
                        floatingLabelText="Publish Date"
                        style={fieldStyle} 
                    />
                    <DatePicker 
                        id='date' 
                        value={new Date(this.state.maxDate)} 
                        onChange={this.handleChangeMaxDate} 
                        hintText="Publish Date" 
                        floatingLabelText="Publish Date"
                        style={fieldStyle} 
                    />
                </div>
            </Dialog>
        );
    }
});

module.exports = EditReservationDialog;