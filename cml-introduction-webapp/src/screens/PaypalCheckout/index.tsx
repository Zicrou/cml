import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import { PayPalButton } from 'react-paypal-button-v2'
import { verifyOrder } from '../../redux/actions/Order/verify'
import { updateInvitation } from '../../redux/actions/Invitation/update'
import { RootState } from '../../redux/reducers/index'
interface componentProps {
  eventFee: string
  eventId: string
  history: any
  inviteId: string
}

const PaypalCheckout: React.FC<componentProps> = (props: componentProps) => {
  const { history, inviteId, eventId } = props
  const eventFee = props.eventFee
  const dispatch = useDispatch()
  const verifyOrderStatus = useSelector((state: RootState) => state.verifyOrder)
  const updateInvitationStatus = useSelector((state: RootState) => state.updateInvitation)
  useEffect(() => {
    if (verifyOrderStatus && verifyOrderStatus.status === 200) {
      dispatch(
        updateInvitation({
          eventId,
          invitationId: inviteId,
          status: 'yes'
        })
      )
    }
  }, [verifyOrderStatus, dispatch, eventId, inviteId])
  useEffect(() => {
    if (updateInvitationStatus && updateInvitationStatus.status === 200) {
      history.push('/rsvp-paid')
    }
  }, [updateInvitationStatus, history])
  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: eventFee
          }
        }
      ]
    })
  }
  const onApprove = (data: any, actions: any) => {
    return actions.order.capture().then(function () {
      const params = { orderId: data.orderID, eventId: props.eventId }
      dispatch(verifyOrder(params))
    })
  }
  const options = {
    clientId: `${process.env.REACT_APP_PAYPAL_CLIENT_ID}`,
    currency: 'USD'
  }
  return (
    <>
      {verifyOrderStatus === true ? (
        <Loader />
      ) : (
        <PayPalButton createOrder={createOrder} onApprove={onApprove} options={options} />
      )}
    </>
  )
}

export default PaypalCheckout
