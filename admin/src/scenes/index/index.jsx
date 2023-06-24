import React, {useEffect, useState} from 'react'

export default function Index(){
    useEffect(() => {
        changeTitle('Admin Dashboard');
      });
    
      const changeTitle = data => {
        document.title = data;
      };
  return (
    <div className="content-wrapper">
            {/* <!-- Content Header (Page header) --> */}
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Admin Dashboard</h1>
                        </div>
                        {/* <!-- /.col --> */}
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="/">Home</a></li>
                                <li className="breadcrumb-item active">Admin Dashboard</li>
                            </ol>
                        </div>
                    {/* <!-- /.col --> */}
                    </div>
                    {/* <!-- /.row --> */}
                </div>
                {/* <!-- /.container-fluid --> */}
            </div>
            {/* <!-- /.content-header --> */}

                {/* <!-- Main content --> */}
            <section className="content">
                <div className="container-fluid">
                    {/* <!-- Info boxes --> */}
                    <div className="row">
                        <div className="col-12 col-sm-6 col-md-4">
                            <div className="info-box">
                            <span className="info-box-icon bg-info elevation-1"><i className="fas fa-tag"></i></span>

                            <div className="info-box-content">
                                <span className="info-box-text">Inventory</span>
                                <span className="info-box-number">
                                10
                                </span>
                            </div>
                            {/* <!-- /.info-box-content --> */}
                            </div>
                            {/* <!-- /.info-box --> */}
                        </div>
                    {/* <!-- /.col --> */}

                    {/* <!-- fix for small devices only --> */}

                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="info-box mb-3">
                            <span className="info-box-icon bg-success elevation-1"><i className="fas fa-shopping-cart"></i></span>

                            <div className="info-box-content">
                                <span className="info-box-text">Sales</span>
                                <span className="info-box-number">760</span>
                            </div>
                            {/* <!-- /.info-box-content --> */}
                        </div>
                        {/* <!-- /.info-box --> */}
                    </div>
                    {/* <!-- /.col --> */}
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="info-box mb-3">
                            <span className="info-box-icon bg-warning elevation-1"><i className="fas fa-users"></i></span>

                            <div className="info-box-content">
                                <span className="info-box-text">New Members</span>
                                <span className="info-box-number">2,000</span>
                            </div>
                        {/* <!-- /.info-box-content --> */}
                        </div>
                        {/* <!-- /.info-box --> */}
                    </div>
                    {/* <!-- /.col --> */}
                </div>
                    {/* <!-- /.row --> */}

                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="card-title">Monthly Recap Report</h5>

                                <div className="card-tools">
                                    <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                        <i className="fas fa-minus"></i>
                                    </button>
                                    
                                    <button type="button" className="btn btn-tool" data-card-widget="remove">
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>
                        {/* <!-- /.card-header --> */}
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-8">
                                    <p className="text-center">
                                        <strong>Sales: 1 Jan, 2014 - 30 Jul, 2014</strong>
                                    </p>

                                    <div className="chart">
                                    {/* <!-- Sales Chart Canvas --> */}
                                        <canvas id="salesChart" height="180" style={{height: 180 + 'px'}}></canvas>
                                    </div>
                                    {/* <!-- /.chart-responsive --> */}
                                </div>
                                {/* <!-- /.col --> */}
                                <div className="col-md-4">
                                    <p className="text-center">
                                    <strong>Goal Completion</strong>
                                    </p>

                                    <div className="progress-group">
                                    Add Products to Cart
                                    <span className="float-right"><b>160</b>/200</span>
                                    <div className="progress progress-sm">
                                        <div className="progress-bar bg-primary" style={{width: '80%'}}></div>
                                    </div>
                                    </div>
                                    {/* <!-- /.progress-group --> */}

                                    <div className="progress-group">
                                    Complete Purchase
                                    <span className="float-right"><b>310</b>/400</span>
                                    <div className="progress progress-sm">
                                        <div className="progress-bar bg-danger" style={{width: '75%'}}></div>
                                    </div>
                                    </div>

                                    {/* <!-- /.progress-group --> */}
                                    <div className="progress-group">
                                    <span className="progress-text">Visit Premium Page</span>
                                    <span className="float-right"><b>480</b>/800</span>
                                    <div className="progress progress-sm">
                                        <div className="progress-bar bg-success" style={{width: '60%'}}></div>
                                    </div>
                                    </div>

                                    {/* <!-- /.progress-group --> */}
                                    <div className="progress-group">
                                    Send Inquiries
                                    <span className="float-right"><b>250</b>/500</span>
                                    <div className="progress progress-sm">
                                        <div className="progress-bar bg-warning" style={{width: '50%'}}></div>
                                    </div>
                                    </div>
                                    {/* <!-- /.progress-group --> */}
                                </div>
                                {/* <!-- /.col --> */}
                            </div>
                            {/* <!-- /.row --> */}
                        </div>
                        {/* <!-- ./card-body --> */}
                        <div className="card-footer">
                            <div className="row">
                            <div className="col-sm-3 col-6">
                                <div className="description-block border-right">
                                <span className="description-percentage text-success"><i className="fas fa-caret-up"></i> 17%</span>
                                <h5 className="description-header">$35,210.43</h5>
                                <span className="description-text">TOTAL REVENUE</span>
                                </div>
                                {/* <!-- /.description-block --> */}
                            </div>
                            {/* <!-- /.col --> */}
                            <div className="col-sm-3 col-6">
                                <div className="description-block border-right">
                                <span className="description-percentage text-warning"><i className="fas fa-caret-left"></i> 0%</span>
                                <h5 className="description-header">$10,390.90</h5>
                                <span className="description-text">TOTAL COST</span>
                                </div>
                                {/* <!-- /.description-block --> */}
                            </div>
                            {/* <!-- /.col --> */}
                            <div className="col-sm-3 col-6">
                                <div className="description-block border-right">
                                <span className="description-percentage text-success"><i className="fas fa-caret-up"></i> 20%</span>
                                <h5 className="description-header">$24,813.53</h5>
                                <span className="description-text">TOTAL PROFIT</span>
                                </div>
                                {/* <!-- /.description-block --> */}
                            </div>
                            {/* <!-- /.col --> */}
                            <div className="col-sm-3 col-6">
                                <div className="description-block">
                                <span className="description-percentage text-danger"><i className="fas fa-caret-down"></i> 18%</span>
                                <h5 className="description-header">1200</h5>
                                <span className="description-text">GOAL COMPLETIONS</span>
                                </div>
                                {/* <!-- /.description-block --> */}
                            </div>
                            </div>
                            {/* <!-- /.row --> */}
                        </div>
                        {/* <!-- /.card-footer --> */}
                        </div>
                        {/* <!-- /.card --> */}
                    </div>
                    {/* <!-- /.col --> */}
                    </div>
                    {/* <!-- /.row --> */}

                    {/* <!-- Main row --> */}
                    <div className="row">
                    {/* <!-- Left col --> */}
                    <div className="col-md-12">
                        
                        {/* <!-- /.row --> */}

                        {/* <!-- TABLE: LATEST ORDERS --> */}
                        <div className="card">
                        <div className="card-header border-transparent">
                            <h3 className="card-title">Latest Orders</h3>

                            <div className="card-tools">
                            <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                <i className="fas fa-minus"></i>
                            </button>
                            <button type="button" className="btn btn-tool" data-card-widget="remove">
                                <i className="fas fa-times"></i>
                            </button>
                            </div>
                        </div>
                        {/* <!-- /.card-header --> */}
                        <div className="card-body p-0">
                            <div className="table-responsive">
                            <table className="table m-0">
                                <thead>
                                <tr>
                                <th>Order ID</th>
                                <th>Item</th>
                                <th>Status</th>
                                <th>Popularity</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                <td><a href="pages/examples/invoice.html">OR9842</a></td>
                                <td>Call of Duty IV</td>
                                <td><span className="badge badge-success">Shipped</span></td>
                                <td>
                                    <div className="sparkbar" data-color="#00a65a" data-height="20">90,80,90,-70,61,-83,63</div>
                                </td>
                                </tr>
                                <tr>
                                <td><a href="pages/examples/invoice.html">OR1848</a></td>
                                <td>Samsung Smart TV</td>
                                <td><span className="badge badge-warning">Pending</span></td>
                                <td>
                                    <div className="sparkbar" data-color="#f39c12" data-height="20">90,80,-90,70,61,-83,68</div>
                                </td>
                                </tr>
                                <tr>
                                <td><a href="pages/examples/invoice.html">OR7429</a></td>
                                <td>iPhone 6 Plus</td>
                                <td><span className="badge badge-danger">Delivered</span></td>
                                <td>
                                    <div className="sparkbar" data-color="#f56954" data-height="20">90,-80,90,70,-61,83,63</div>
                                </td>
                                </tr>
                                <tr>
                                <td><a href="pages/examples/invoice.html">OR7429</a></td>
                                <td>Samsung Smart TV</td>
                                <td><span className="badge badge-info">Processing</span></td>
                                <td>
                                    <div className="sparkbar" data-color="#00c0ef" data-height="20">90,80,-90,70,-61,83,63</div>
                                </td>
                                </tr>
                                <tr>
                                <td><a href="pages/examples/invoice.html">OR1848</a></td>
                                <td>Samsung Smart TV</td>
                                <td><span className="badge badge-warning">Pending</span></td>
                                <td>
                                    <div className="sparkbar" data-color="#f39c12" data-height="20">90,80,-90,70,61,-83,68</div>
                                </td>
                                </tr>
                                <tr>
                                <td><a href="pages/examples/invoice.html">OR7429</a></td>
                                <td>iPhone 6 Plus</td>
                                <td><span className="badge badge-danger">Delivered</span></td>
                                <td>
                                    <div className="sparkbar" data-color="#f56954" data-height="20">90,-80,90,70,-61,83,63</div>
                                </td>
                                </tr>
                                <tr>
                                <td><a href="pages/examples/invoice.html">OR9842</a></td>
                                <td>Call of Duty IV</td>
                                <td><span className="badge badge-success">Shipped</span></td>
                                <td>
                                    <div className="sparkbar" data-color="#00a65a" data-height="20">90,80,90,-70,61,-83,63</div>
                                </td>
                                </tr>
                                </tbody>
                            </table>
                            </div>
                            {/* <!-- /.table-responsive --> */}
                        </div>
                        {/* <!-- /.card-body --> */}
                        <div className="card-footer clearfix">
                            <a href="javascript:void(0)" className="btn btn-sm btn-info float-left">Place New Order</a>
                            <a href="javascript:void(0)" className="btn btn-sm btn-secondary float-right">View All Orders</a>
                        </div>
                        {/* <!-- /.card-footer --> */}
                        </div>
                        {/* <!-- /.card --> */}
                    </div>
                    {/* <!-- /.col --> */}

                    
                    {/* <!-- /.col --> */}
                    </div>
                    {/* <!-- /.row --> */}
                </div>
            {/* <!--/. container-fluid --> */}
            </section>
            {/* <!-- /.content --> */}
        </div>
  )
}
