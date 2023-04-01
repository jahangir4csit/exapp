import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from '../../components/layout/Layout';
import { useDispatch, useSelector  } from 'react-redux'
import { Input, Form, Button, Typography, notification, InputNumber, Select, Upload, Spin, Modal  } from 'antd';
import {FontSizeOutlined, ScanOutlined, PoundCircleOutlined, PlusOutlined  } from '@ant-design/icons'
import {  
    getProduct,
    getProducts,
    selectIsLoading,
    selectProduct,
    updateProduct
 } from '../../redux/features/product/productSlice';

const { Title  } = Typography;
// import './dashboard.css';


export default function EditProduct() {

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector(selectIsLoading);
  
    const productEdit = useSelector(selectProduct);

    const [product, setProduct] = useState(productEdit);
    

    const onChange = (value) => {
        console.log('changed', value);
    };
    const normFile = (e) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
    };

    // console.log(product, 'get product');

    useEffect(() => {
        dispatch(getProduct(id));
      }, [dispatch, id]);

      useEffect(() => {
        setProduct(productEdit);
      }, [productEdit]);


    const onFinish = async(values) => {

        const {name, price, quantity, category, description, image } = values

        //validation
        if(!name || !price || !quantity || !category){
          return notification.error({
            message: 'Validation Faild',
            description:
              'All fields are required',
          });
        }

        const productImage = image[0].originFileObj;
        const formData = new FormData();
        formData.append('name', name);
        formData.append('category', category);
        formData.append('quantity', quantity);
        formData.append('price', price);
        formData.append('description', description);
        if(productImage){
            formData.append('image', productImage);
        }

        console.log(productImage, 'img...');

        await dispatch(updateProduct({ id, formData }));
        await dispatch(getProducts());
        navigate("/products");

    };

    const initialValues = {
        name: product?.name,
        sku: product?.sku,
        price: product?.price,
        quantity: product?.quantity,
        category: product?.category,
        // image: product?.image,
        description: product?.description
    }

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const [prefileList, setPreFileList] = useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: product?.image.filePath,
          },
    ]);

    const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
    
    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
      };


    return (
        <Layout>
            <div className="space-align-block">
                <Title level={2} className='mb-6'>Edit Product</Title>
                <Form name="auth" className='mb-12' size="large" onFinish={onFinish} initialValues={initialValues} defaultValue={initialValues}
                style={{
                    maxWidth: 600,
                }}
                >
                <Spin spinning={isLoading}>
                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: 'Please input Product title!' }]}
                    >
                        <Input size="large"
                        prefix={<FontSizeOutlined
                        className="site-form-item-icon" />} 
                        />
                    </Form.Item>
                    <Form.Item
                        name="sku"
                        rules={[{ required: true, message: 'Please input product SKU' }]}
                    >
                        <Input size="large" 
                        prefix={<ScanOutlined
                        className="site-form-item-icon" />} 
                        />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        value={product?.price}
                        rules={[{ required: true, message: 'Please input product price' }]}
                    >
                        <Input size="large" 
                        prefix={<PoundCircleOutlined
                        className="site-form-item-icon" />} 
                        value={product?.price}
                        />
                    </Form.Item>
                    <Form.Item
                        name="quantity"
                        rules={[{ required: true, message: 'Please input product quantity' }]}
                        label="Product Quantity"
                    >
                        <InputNumber size="large" min={1} max={100000} defaultValue={3} onChange={onChange} />
                    </Form.Item>
                        <Form.Item
                        name="category"
                        rules={[{ required: true, message: 'Please select product category' }]}
                        label="Product Category"
                        >
                            <Select
                                showSearch
                                style={{
                                width: 200,
                                }}
                                placeholder="Search to Select"
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={[
                                {
                                    value: 'Beauty & Personal',
                                    label: 'Beauty & Personal',
                                },
                                {
                                    value: 'Toys & games',
                                    label: 'Toys & games',
                                },
                                {
                                    value: 'Sports & outdoors',
                                    label: 'Sports & outdoors',
                                },
                                {
                                    value: 'Electronics ',
                                    label: 'Electronics',
                                }
                                ]}
                            />
                        </Form.Item>
                    
                        <Form.Item 
                            name="image" 
                            label="Upload Product Image" 
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                        >
                            <Upload customRequest="" listType="picture-card" maxCount={1}
                            defaultFileList={[...prefileList]}
                            onPreview={handlePreview}
                            >
                                <div>
                                <PlusOutlined />
                                    <div
                                        style={{
                                        marginTop: 8,
                                        }}
                                    >
                                        Upload
                                    </div>
                                </div>
                            </Upload>
                            {/* <Modal open={previewOpen} title={'Preview'} footer={null} onCancel={handleCancel}>
                                <img
                                alt="example"
                                style={{
                                    width: '100%',
                                }}
                                src={previewImage}
                                />
                            </Modal> */}
                        </Form.Item>
                        <Form.Item
                        name="description"
                        rules={[{ required: true, message: 'Please input product description' }]}
                        >
                            <Input.TextArea showCount maxLength={100} placeholder='Product Description' />
                        </Form.Item>
                    
                        <Form.Item className='mt-6'>
                            <Button type="primary" size="large" htmlType="submit" className='mr-4'>
                                Update Product
                            </Button>
                        </Form.Item>
                    </Spin>
                </Form>
            </div>
        </Layout>
    );
};