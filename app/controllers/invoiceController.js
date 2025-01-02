import {
  createInvoiceService,
  invoiceDetailsService,
  invoiceListService,
  paymentCancelService,
  paymentFailedService,
  paymentIPNService,
  paymentSuccessService,
} from "../services/invoiceServices.js";

export const createInvoice = async (req, res) => {
  let result = await createInvoiceService(req, res);
  return res.status(200).json(result);
};

export const invoiceList = async (req, res) => {
  let result = await invoiceListService(req, res);
  return res.status(200).json(result);
};

export const invoiceDetails = async (req, res) => {
  let result = await invoiceDetailsService(req, res);
  return res.status(200).json(result);
};

export const paymentSuccess = async (req, res) => {
  let result = await paymentSuccessService(req, res);
  return res.redirect(`${process.env.FRONTEND_URL}/orders`);
};

export const paymentCancel = async (req, res) => {
  let result = await paymentCancelService(req, res);
  return res.redirect(`${process.env.FRONTEND_URL}/orders`);
};

export const paymentFailed = async (req, res) => {
  let result = await paymentFailedService(req, res);
  return res.redirect(`${process.env.FRONTEND_URL}/orders`);
};
export const paymentIPN = async (req, res) => {
  let result = await paymentIPNService(req, res);
  return res.status(200).json(result);
};
