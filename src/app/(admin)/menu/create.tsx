import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native'
import React, { useEffect } from 'react'
import Button from '@/components/Button'
import { defaultPizzaImage } from '@/components/ProductListItem'
import Colors from '@/constants/Colors'
import * as ImagePicker from 'expo-image-picker';
import { Stack, router, useLocalSearchParams, useRouter } from 'expo-router'
import { useDeleteProduct, useInsertProduct, useProduct, useUpdateProduct } from '@/api/products'

const CreateProductScreen = () => {

    const [name, setName] = React.useState('')
    const [price, setPrice] = React.useState('')
    const [image, setImage] = React.useState<string | null >(null);
    
    const [error, setError] = React.useState('')
 
     const { id: idString } = useLocalSearchParams();
  if (!idString) return <Text>Product not found</Text>;

  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);
    const isUpdating = !!id
    const router = useRouter()
    const {mutate : insertProduct} =  useInsertProduct()
    const {mutate: updateProduct} = useUpdateProduct()
    const {mutate : deleteProduct} = useDeleteProduct()
    const { data: updatingProduct} = useProduct(id);

    useEffect(() => {
        if (isUpdating && updatingProduct) {
            setName(updatingProduct.name)
            setPrice(updatingProduct.price.toString())
            setImage(updatingProduct.image)
        }
    }, [updatingProduct])

    const resetFields = () => {
        setName('')
        setPrice('')
    }

    const validateInputs = () => {
        setError('')
        if (!name || !price) {
            setError('Please fill all the fields')
            return false
        }

        if (isNaN(parseFloat(price))) {
            setError('Please enter a valid price')
            return false
        }

        return true
    }


    const onCreate = () => {
        if (!validateInputs()) return
        insertProduct({
            name,
            price: parseFloat(price),
            image
        
        }, {onSuccess: () => {
            resetFields()
           router.back() 

        },})
     
    }  

    const onUpdate = () => {
        if (!validateInputs()) return
        
        updateProduct({
            id,
            name,
            price: parseFloat(price),
            image
        }, {onSuccess: () => {
            resetFields()
            router.back()
        }})
   
    }  

    const onSubmit = () => {
        if (isUpdating) {
            onUpdate()
        } else {
            onCreate()
        }
    }

    const onDelete = () => {
       deleteProduct(id, {onSuccess: () => {
              resetFields()
              router.replace('/(admin)')
         }})
    }

    const confirmDelete = () => {
        Alert.alert('Delete Product', 'Are you sure you want to delete this product?', [
            {
                text: 'Yes',
                onPress: onDelete
            },
            {
                text: 'No',
                style: 'cancel'
            }
        ])
    }


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };


  return (
    <View style={styles.container}>
        <Stack.Screen options={{ title: isUpdating ? 'Update Product' : 'Create Product' }} />
        <Image source={{uri: image || defaultPizzaImage }} style={styles.image} />
        <Text onPress={pickImage} style={styles.textButton}>Select Image</Text>
        <Text style={styles.label}>Name</Text>
      <TextInput value={name} onChangeText={setName}  placeholder='name' style={styles.input}/>
      <Text style={styles.label}>Price ($)</Text>
      <TextInput value={price} onChangeText={setPrice} placeholder='9.99' style={styles.input} keyboardType='numeric'/>
        <Text style={{color: 'red'}}>{error}</Text>
     <Button  onPress={onSubmit} text={ isUpdating ? 'Update' : 'Create'} />
     {isUpdating && <Text onPress={confirmDelete} style={styles.textButton}>Delete</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
    container :{
        flex: 1,
        justifyContent: 'center',
        padding: 10,

    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
     
    },
    label: {
       color: 'gray',
       fontSize: 16,
    },
    image: {
        width: '50%',
       aspectRatio: 1,
         alignSelf: 'center',
    },
    textButton: {
        color: Colors.light.tint,
        alignSelf: 'center',
        fontWeight: 'bold',
        marginVertical: 10,
    }

})

export default CreateProductScreen