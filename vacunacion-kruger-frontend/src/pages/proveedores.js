import { useState, useEffect } from "react";
import MainLayout from "layouts/MainLayout";
import MenuList from "components/MenuList";
import LoadingPage from "components/LoadingPage";
import CustomModal from "components/modals/CustomModal";
import Input from "components/Input";
import SelectInput from "components/SelectInput";
import TipoIdentificacionApi from "api/TipoIdentificacionApi";
import Collapse from "@mui/material/Collapse";
import FormModal from "components/modals/FormModal";
import ConfirmModal from "components/modals/ConfirmModal";
import CrudAlerts from "components/alerts/CrudAlerts";
import {
  DataGrid,
  gridFilterActiveItemsLookupSelector,
} from "@mui/x-data-grid";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import EditIcon from "@mui/icons-material/Edit";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { makeStyles } from "@mui/styles";
import Zoom from "@mui/material/Zoom";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import Fab from "@mui/material/Fab";
import KeyIcon from "@mui/icons-material/Key";
import Select from "@mui/material/Select";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CategoryIcon from "@mui/icons-material/Category";
import MenuItem from "@mui/material/MenuItem";
import CalculateIcon from "@mui/icons-material/Calculate";
import DescriptionIcon from "@mui/icons-material/Description";
import ProveedorApi from "api/ProveedorApi";
import ListAltIcon from "@mui/icons-material/ListAlt";
import getThirdDigit from "utilities/getThirdDigit";
import validation from "utilities/validation";
import {createProveedorAdapter} from "adapters/proveedorAdapter";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: "#111827",
    padding: "10px",
    "&:hover": {
      backgroundColor: "#1f2937",
    },
  },

  editButton: {
    backgroundColor: "#3b83bd",
    color: "white",
    "&:hover": {
      backgroundColor: "#0096d2",
    },
  },

  removeButton: {
    backgroundColor: "#dc2626",
    color: "white",
    "&:hover": {
      backgroundColor: "#ef4444",
    },
  },

  textInput: {
    marginRight: "10px",
  },

  select: {
    width: "49%",
    marginRight: "9px",
  },
}));

const ProvedoresPage = () => {
  const classes = useStyles();

  let { isEmpty, isNumber, isEmail, isCedula, isRuc, isPasaporte, varExists } =
    validation;

  const [openAddDialog, setOpenAddDialog] = useState(false);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [openEditDialog, setOpenEditDialog] = useState(false);

  const [typeAlert, setTypeAlert] = useState("");

  const [productosToDelete, setProductosToDelete] = useState([]);

  const [proAdded, setProAdded] = useState(false);

  const [proDeleted, setProDeleted] = useState(false);

  const [proveedores, setProveedores] = useState([]);

  const [addForm, setAddForm] = useState({
    tipoIdentificacion: "",
    rucExtranPerNatural: "",
    contribuyenteEspecial: "",
    tituloSuperior: "",
    llevaContabilidad: "",
    impRenta: "",
  });

  const [disableFields, setDisableFields] = useState({
    rucExtranPerNatural: true,
    contribuyenteEspecial: true,
    tituloSuperior: true,
    llevaContabilidad: true,
    impRenta: true,
  });

  const [errorFields, setErrorFields] = useState({
    rucExtranPerNatural: {
      isError: false,
      message: null,
    },
    contribuyenteEspecial: {
      isError: false,
      message: null,
    },
    tituloSuperior: {
      isError: false,
      message: null,
    },
    llevaContabilidad: {
      isError: false,
      message: null,
    },
    impRenta: {
      isError: false,
      message: null,
    },
  });

  const [editForm, setEditForm] = useState({});

  const [requestResolved, setRequestResolved] = useState(false);

  const [rowsSelected, setRowsSelected] = useState(0);

  const [response, setResponse] = useState({});

  const [namesProToDelete, setNamesProToDelete] = useState([]);

  const [showOptions, setShowOptions] = useState(false);

  const [dataToForms, setDataToForms] = useState({
    tiposIdentificacion: [],
    provincias: [],
  });

  const [addFormChanged, setAddFormChanged] = useState(false);

  const [rucFieldChanged, setRucFieldChanged] = useState(false);

  const [disabledButton, setDisabledButton] = useState(true);

  let proveedorApi = new ProveedorApi();

  useEffect(() => {
    loadProveedores();
    return () => {
      setProveedores([]);
    };
  }, [proAdded, proDeleted]);

  useEffect(() => {
    loadDataToForms();
    return () => {
      setDataToForms({
        tiposIdentificacion: [],
        provincias: [],
      });
    };
  }, []);

  useEffect(() => {
    setOptionsValues();

    return () => {
      setAddFormChanged(false);
    };
  }, [addFormChanged]);

  useEffect(() => {
    updateOptionsValues();

    return () => {
      setRucFieldChanged(false);
    };
  }, [rucFieldChanged]);

  useEffect(() => {
    checkFields();
    return () => {
      setDisabledButton(true);
    };
  }, [errorFields]);

  const loadDataToForms = async () => {
    let tipoIdentificacionApi = new TipoIdentificacionApi();
    let _tiposIdentificacion =
      await tipoIdentificacionApi.getAllTiposIdentificacion();

    if (_tiposIdentificacion.status === 200) {
      setDataToForms({
        tiposIdentificacion: _tiposIdentificacion.data,
      });
    } else {
    }
  };

  const loadProveedores = async () => {

    let proveedores = await proveedorApi.getAllProveedores();
    // let proveedor = await proveedorApi.getProveedorById(1);
    // console.log(proveedor);
    // let prov = createProveedorAdapter(proveedor.data);
    // console.log(prov);

    if (proveedores.status === 200) {
      setProveedores(proveedores.data);
      setProAdded(false);
      setProDeleted(false);
      setRequestResolved(true);
    } else {
      setRequestResolved(true);
    }
  };

  const columns = [
    {
      field: "numRecord",
      headerName: "N°",
      width: 70,
    },
    {
      field: "nombre",
      headerName: "Nombre",
      width: 120,
    },
    {
      field: "identificacion",
      headerName: "RUC/Cédula/Pasaporte",
      width: 180,
    },
    {
      field: "tipoIdentificacion",
      headerName: "Tipo de identificacion",
      width: 170,
    },
    {
      field: "direccion",
      headerName: "Direccion",
      width: 120,
    },
    {
      field: "telefono",
      headerName: "Telefono",
      width: 120,
    },
    {
      field: "mail",
      headerName: "E-mail",
      width: 120,
    },
  ];

  const rows = []
//proveedores.map((pro, index) => ({
//      numRecord: index + 1,
//     id: pro.infoPro.productoId,
//    }));

  const setOptionsValues = () => {
    let tipoIdentificacion = addForm.tipoIdentificacion;

    let idenValueExists = varExists(addForm.tipoIdenValue);

    let thirdDigit =
      tipoIdentificacion === "RUC" && idenValueExists
        ? getThirdDigit(addForm.tipoIdenValue)
        : "";

    const cedulaPasaporteValues = {
      rucExtranPerNatural: "si",
      contribuyenteEspecial: "no",
      tituloSuperior: "si",
      llevaContabilidad: "no",
      impRenta: "si",
    };

    const perNaturalValues = {
      rucExtranPerNatural: "si",
      contribuyenteEspecial: "no",
      tituloSuperior: "si",
      llevaContabilidad: "no",
      impRenta: "si",
    };

    const sectorPublicoValues = {
      rucExtranPerNatural: "no",
      contribuyenteEspecial: "si",
      tituloSuperior: "no",
      llevaContabilidad: "si",
      impRenta: "no",
    };

    const sectorPrivadoValues = {
      rucExtranPerNatural: "no",
      contribuyenteEspecial: "no",
      tituloSuperior: "no",
      llevaContabilidad: "si",
      impRenta: "si",
    };

    const cedulaPasaporteDisable = {
      rucExtranPerNatural: true,
      contribuyenteEspecial: true,
      tituloSuperior: true,
      llevaContabilidad: true,
      impRenta: true,
    };

    const perNaturalDisable = {
      rucExtranPerNatural: true,
      contribuyenteEspecial: false,
      tituloSuperior: false,
      llevaContabilidad: false,
      impRenta: true,
    };

    const sectorPublicoDisable = {
      rucExtranPerNatural: false,
      contribuyenteEspecial: true,
      tituloSuperior: false,
      llevaContabilidad: true,
      impRenta: true,
    };

    const sectorPrivadoDisable = {
      rucExtranPerNatural: false,
      contribuyenteEspecial: false,
      tituloSuperior: false,
      llevaContabilidad: true,
      impRenta: false,
    };

    let showOptions =
      tipoIdentificacion === "Cédula" || tipoIdentificacion === "Pasaporte"
        ? true
        : tipoIdentificacion === "RUC"
        ? idenValueExists
          ? addForm.tipoIdenValue.length >= 3 &&
            thirdDigit !== "7" &&
            thirdDigit !== "8"
            ? true
            : false
          : false
        : false;

    let optionsValues =
      tipoIdentificacion === "Cédula" || tipoIdentificacion === "Pasaporte"
        ? cedulaPasaporteValues
        : idenValueExists
        ? tipoIdentificacion === "RUC" && thirdDigit >= "0" && thirdDigit <= "5"
          ? perNaturalValues
          : tipoIdentificacion === "RUC" && thirdDigit === "6"
          ? sectorPublicoValues
          : tipoIdentificacion === "RUC" && thirdDigit === "9"
          ? sectorPrivadoValues
          : {}
        : {};

    let disableFieldsValues =
      tipoIdentificacion === "Cédula" || tipoIdentificacion === "Pasaporte"
        ? cedulaPasaporteDisable
        : idenValueExists
        ? tipoIdentificacion === "RUC" && thirdDigit >= "0" && thirdDigit <= "5"
          ? perNaturalDisable
          : tipoIdentificacion === "RUC" && thirdDigit === "6"
          ? sectorPublicoDisable
          : tipoIdentificacion === "RUC" && thirdDigit === "9"
          ? sectorPrivadoDisable
          : {}
        : {};

    let addFormValue = { ...addForm, ...optionsValues };
    let disableValues = { ...disableFields, ...disableFieldsValues };

    // alert(thirdDigit);
    // alert(JSON.stringify(optionsValues));
    // alert(showOptions);
    // thirdDigit === "6" ? alert("es un sectoir iublico"): alert("NO sirve esta huevada");
    setDisableFields(disableValues);
    setAddForm(addFormValue);
    setShowOptions(showOptions);
  };

  const updateOptionsValues = () => {
    let tipoIdentificacion = addForm.tipoIdentificacion;

    let rucExtranPerNatural = addForm.rucExtranPerNatural;

    let idenValueExists = varExists(addForm.tipoIdenValue);

    let thirdDigit =
      tipoIdentificacion === "RUC" && idenValueExists
        ? getThirdDigit(addForm.tipoIdenValue)
        : "";

    const sectorPublicoValues = {
      contribuyenteEspecial: rucExtranPerNatural === "si" ? "no" : "si",
      tituloSuperior: rucExtranPerNatural === "si" ? "si" : "no",
      llevaContabilidad: rucExtranPerNatural === "si" ? "no" : "si",
      impRenta: rucExtranPerNatural === "si" ? "si" : "no",
    };

    const sectorPrivadoValues = {
      contribuyenteEspecial: "no",
      tituloSuperior: rucExtranPerNatural === "si" ? "si" : "no",
      llevaContabilidad: rucExtranPerNatural === "si" ? "no" : "si",
      impRenta: "si",
    };

    const sectorPublicoDisable = {
      contribuyenteEspecial: rucExtranPerNatural === "si" ? false : true,
      tituloSuperior: false,
      llevaContabilidad: rucExtranPerNatural === "si" ? false : true,
      impRenta: true,
    };

    const sectorPrivadoDisable = {
      contribuyenteEspecial: false,
      tituloSuperior: false,
      llevaContabilidad: rucExtranPerNatural === "si" ? false : true,
      impRenta: rucExtranPerNatural === "si" ? true : false,
    };

    let optionsValues = idenValueExists
      ? tipoIdentificacion === "RUC" && thirdDigit === "6"
        ? sectorPublicoValues
        : tipoIdentificacion === "RUC" && thirdDigit === "9"
        ? sectorPrivadoValues
        : {}
      : {};

    let disableFieldsValues = idenValueExists
      ? tipoIdentificacion === "RUC" && thirdDigit === "6"
        ? sectorPublicoDisable
        : tipoIdentificacion === "RUC" && thirdDigit === "9"
        ? sectorPrivadoDisable
        : {}
      : {};

    let addFormValue = { ...addForm, ...optionsValues };
    let disableValues = { ...disableFields, ...disableFieldsValues };

    setDisableFields(disableValues);
    setAddForm(addFormValue);
  };

  const handleCellEditCommit = (params) => {};

  const handleRowSelected = (params) => {
    let listProToDelete = [];
    setProductosToDelete(params);
    let rowsSelected = params.length;
    setRowsSelected(rowsSelected);
    params.forEach((product) => {
      listProToDelete.push(
        proveedores.find((pro) => pro.infoPro.productoId === product)
      );
    });

    setNamesProToDelete(
      listProToDelete.map((pro) => pro.infoPro.productoNombre)
    );
  };

  const handleFieldChange = (e) => {
    let field = {
      name: e.target.name,
      value: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    };

    setAddForm({
      ...addForm,
      [field.name]: field.value,
    });

    validationField(field.name, field.value);

    setRucFieldChanged(field.name === "rucExtranPerNatural" ? true : false);

    setAddFormChanged(
      field.name === "tipoIdentificacion" || field.name === "tipoIdenValue"
        ? true
        : false
    );
  };

  const validationField = (fieldName, fieldValue) => {
    let tipoIdentificacion = addForm.tipoIdentificacion;
    let isOptional = false;
    let optionalFields = ["emailSecundario"];
    let error = {
      isError: false,
      message: null,
    };
    let field = {
      name: fieldName,
      value: fieldValue,
    };

    isOptional = optionalFields.includes(field.name);

    let _isEmpty = isEmpty(field.value);

    if (!_isEmpty.isError && !isOptional) {
      switch (field.name) {
        case "tipoIdenValue":
          error.isError =
            tipoIdentificacion.length > 0
              ? tipoIdentificacion === "Pasaporte"
                ? isPasaporte(field.value).isError
                : false
              : false;

          error.message =
            tipoIdentificacion.length > 0
              ? tipoIdentificacion === "Pasaporte"
                ? isPasaporte(field.value).message
                : null
              : null;

          break;

        case "emailPrincipal":
          error.isError = isEmail(field.value).isError;
          error.message = isEmail(field.value).message;
          break;
      }
    } else if (isOptional) {
      if (!_isEmpty.isError) {
        switch (field.name) {
          case "emailSecundario":
            error.isError = isEmail(field.value).isError;
            error.message = isEmail(field.value).message;
            break;
        }
      }
    } else {
      error.isError = _isEmpty.isError;
      error.message = _isEmpty.message;
    }

    setErrorFields({
      ...errorFields,
      [field.name]: {
        isError: error.isError,
        message: error.message,
      },
    });
  };

  const handleBlur = (e) => {
    validationField(e.target.name, e.target.value);
  };

  const handleChangeEdit = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const checkFields = () => {
    //let textFields = form.getElementsByTagName("input");
    //console.log("Con getTagNmae"+textFields[0].value );
    let form = document.getElementById("addForm");

    if (form !== null) {
      let withErrors = true;
      let errors = false;
      let finalCheckErrors = false;
      let optionalFields = ["emailSecundario"];
      let textFields = form.querySelectorAll("input");
      let selects = form.querySelectorAll("select");
      let fields = [];

      for (var error in errorFields) {
        fields.push({ fieldName: error, errorValue: errorFields[error] });
      }
    
      const includeString = (arr, str) => {
        let result = false;

        arr.forEach((field) => {
          if (field.fieldName === str) {
            result = true;
          }
        });

        return result;
      };

      const checkOptional = (arr, str) => {
        let result = false;

        arr.forEach((field) => {
          if (field === str) {
            result = !includeString(fields, str);
          }
        });

        return result;
      };

      const findValue = (arr, str) => {
        let result = false;

        arr.forEach((field) => {
          if (field.fieldName === str) {
            result = field.errorValue.isError;
          }
        });

        return result;
      };

      const checkErrorField = (field) => {
        let name = field.name;
        errors = checkOptional(optionalFields, name)
          ? false
          : includeString(fields, name)
          ? findValue(fields, name)
          : true;
        finalCheckErrors = errors ? true : finalCheckErrors;
      };

      textFields.forEach(checkErrorField);

      selects.forEach(checkErrorField);

      withErrors = finalCheckErrors;

      setDisabledButton(withErrors);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setRequestResolved(false);

    // let proveedorApi = new ProveedorApi();
    // let response = await proveedorApi.saveProducto({
    //   productoCodPrincipal: addForm.codPrincipal,
    //   productoCodAuxiliar: addForm.codAuxiliar,
    //   productoNombre: addForm.nombre,
    //   productoPrecio: addForm.precio,
    //   tipoProId: addForm.tipoPro,
    //   ivaId: addForm.iva,
    // });
    // setResponse(response);
    // if (response.status === 201) {
    //   setTimeout(() => setProAdded(true), 5000);
    //   setOpenAddDialog(false);
    //   setAddForm({});
    //   setTypeAlert("add");
    //   setRequestResolved(false);
    //   setTimeout(() => setTypeAlert(""), 5000);
    // } else {
    // }
  };

  const handleOpenEditDialog = () => {
    let product = {};
    setOpenEditDialog(true);
    productosToDelete.forEach((pro) => {
      product = proveedores.find(
        (product) => product.infoPro.productoId === pro
      );
    });
    console.log(product);

    setEditForm({
      id: product.infoPro.productoId,
      codPrincipal: product.infoPro.productoCodPrincipal,
      codAuxiliar: product.infoPro.productoCodAuxiliar,
      tipoPro: product.tipoPro.tipoProId,
      precio: product.infoPro.productoPrecio,
      iva: product.iva.ivaId,
      nombre: product.infoPro.productoNombre,
    });
  };

  const handleEdit = async () => {
    setRequestResolved(true);

    let proveedorApi = new ProveedorApi();
    let response = await proveedorApi.updateProducto(editForm.id, {
      productoId: editForm.id,
      productoCodPrincipal: editForm.codPrincipal,
      productoCodAuxiliar: editForm.codAuxiliar,
      productoNombre: editForm.nombre,
      productoPrecio: editForm.precio,
      tipoProId: editForm.tipoPro,
      ivaId: editForm.iva,
    });
    if (response.status === 204) {
      setRowsSelected(0);
      setOpenEditDialog(false);
      setRequestResolved(false);
      setTimeout(() => setProDeleted(true), 5000);
    }
  };

  const handleDelete = () => {
    let response = 0;
    setRequestResolved(true);

    let proveedorApi = new ProveedorApi();
    setOpenDeleteDialog(false);
    setRowsSelected(0);
    productosToDelete.forEach(async (pro, index) => {
      response = await proveedorApi.removeProducto(pro);
      console.log("vuelta", index, response);
    });

    if (response.status === 204) {
      console.log("se elimino el producto");
      setTimeout(() => setProDeleted(true), 10000);
      setRequestResolved(false);
    }
  };

  if (requestResolved) {
    return (
      <MainLayout
        namePage="Proveedores"
        titlePage="Proveedores"
        iconPage={<LocalShippingIcon sx={{ fontSize: 28 }} />}
      >
        {/* {JSON.stringify(dataToForms.tiposIdentificacion)} */}
        <Stack spacing={1} direction="column">
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              className={classes.button}
              onClick={() => setOpenAddDialog(true)}
            >
              <AddIcon />
              Agregar proveedor
            </Button>
          </Stack>
          <CrudAlerts typeAlert={typeAlert} itemName="Producto" />

          <Stack
            style={{ height: 500, width: "100%" }}
            spacing={1}
            direction="column"
          >
            {rowsSelected > 0 && (
              <Zoom in={rowsSelected > 0 ? true : false}>
                <Toolbar
                  sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    backgroundColor: "#c5e2f6",
                  }}
                >
                  <Typography
                    sx={{ flex: "1 1 100%" }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                  >
                    <Stack spacing={1} direction="row" alignItems="center">
                      <MenuList
                        icon={
                          <ListAltIcon
                            sx={{ fontSize: 26, color: "#111827" }}
                          />
                        }
                        items={namesProToDelete}
                        menuName="proSelected"
                        toolTipTitle="Proveedores seleccionados"
                      />
                      {rowsSelected} proveedor(s) seleccionado(s)
                    </Stack>
                  </Typography>
                  <Stack spacing={2} direction="row">
                    <Zoom in={rowsSelected === 1 ? true : false}>
                      <Tooltip title="Editar el proveedor seleccionado">
                        <Fab
                          size="small"
                          className={classes.editButton}
                          onClick={handleOpenEditDialog}
                        >
                          <EditIcon className={classes.icon} />
                        </Fab>
                      </Tooltip>
                    </Zoom>

                    <Tooltip title="Borrar los/el proveedor(s) seleccionado(s)">
                      <Fab
                        className={classes.removeButton}
                        size="small"
                        onClick={() => setOpenDeleteDialog(true)}
                      >
                        <DeleteIcon />
                      </Fab>
                    </Tooltip>
                  </Stack>
                </Toolbar>
              </Zoom>
            )}

            <DataGrid
              columns={columns}
              rows={rows}
              pageSize={10}
              rowsPerPageOptions={[10, 20]}
              checkboxSelection
              disableSelectionOnClick
              //loading={proveedores.length === 0}
              onCellEditCommit={handleCellEditCommit}
              onSelectionModelChange={handleRowSelected}
              density="compact"
            />
          </Stack>

          <FormModal
            formId="addForm"
            actionDisabled={disabledButton}
            title="Agregar proveedor"
            titleIcon={
              <AddToPhotosIcon
                sx={{
                  fontSize: 28,
                  color: "#16A34A",
                }}
              />
            }
            actionLabel="Agregar"
            maxWidth="md"
            openDialog={openAddDialog}
            handleClose={() => setOpenAddDialog(false)}
            handleSubmit={handleFormSubmit}
          >
            <SelectInput
              inputId="tipoIdentificacion"
              xs={12}
              sm={4}
              md={addForm.tipoIdentificacion === "RUC" ? 4 : 5}
              label="Tipo de identificación"
              handleBlur={handleBlur}
              handleChange={handleFieldChange}
              error={
                varExists(errorFields.tipoIdentificacion)
                  ? errorFields.tipoIdentificacion
                  : null
              }
            >
              <option value="">Seleccione una opción</option>

              {dataToForms.tiposIdentificacion.map((tipo) => (
                <option value={tipo.tipoIdenNombre} key={tipo.tipoIdenNombre}>
                  {tipo.tipoIdenNombre}
                </option>
              ))}
            </SelectInput>

            <Input
              inputId="tipoIdenValue"
              xs={12}
              sm={4}
              md={addForm.tipoIdentificacion === "RUC" ? 4 : 7}
              label={
                addForm.tipoIdentificacion.length > 0
                  ? addForm.tipoIdentificacion
                  : "RUC-Cédula-Pasaporte"
              }
              handleBlur={handleBlur}
              handleChange={handleFieldChange}
              error={
                varExists(errorFields.tipoIdenValue)
                  ? errorFields.tipoIdenValue
                  : null
              }
              disabled={addForm.tipoIdentificacion.length > 0 ? false : true}
            />

            {addForm.tipoIdentificacion === "RUC" && (
              <SelectInput
                inputId="parteRelacionada"
                xs={2}
                sm={4}
                md={4}
                label="Parte relacionada"
                handleBlur={handleBlur}
                handleChange={handleFieldChange}
                error={
                  varExists(errorFields.parteRelacionada)
                    ? errorFields.parteRelacionada
                    : null
                }
              >
                <option value="">Seleccione una opción</option>
                <option value="si">Sí</option>
                <option value="no">No</option>
              </SelectInput>
            )}

            <Input
              inputId="nombreProveedor"
              xs={12}
              sm={12}
              md={6}
              label="Nombre del proveedor"
              handleBlur={handleBlur}
              handleChange={handleFieldChange}
              error={
                varExists(errorFields.nombreProveedor)
                  ? errorFields.nombreProveedor
                  : null
              }
            />

            <Input
              inputId="direccion"
              xs={12}
              sm={12}
              md={6}
              label="Dirección"
              handleBlur={handleBlur}
              handleChange={handleFieldChange}
              error={
                varExists(errorFields.direccion) ? errorFields.direccion : null
              }
            />

            <SelectInput
              inputId="provincia"
              xs={2}
              sm={4}
              md={4}
              label="Provincia"
              handleBlur={handleBlur}
              handleChange={handleFieldChange}
              error={
                varExists(errorFields.provincia) ? errorFields.provincia : null
              }
            >
              <option value="">Seleccione una opción</option>
              <option value="San José">Pichincha</option>
            </SelectInput>

            <Input
              inputId="ciudad"
              xs={2}
              sm={4}
              md={4}
              label="Ciudad"
              handleBlur={handleBlur}
              handleChange={handleFieldChange}
              error={varExists(errorFields.ciudad) ? errorFields.ciudad : null}
            />

            <Input
              inputId="telefono"
              item
              xs={2}
              sm={4}
              md={4}
              label="Teléfono"
              handleBlur={handleBlur}
              handleChange={handleFieldChange}
              error={
                varExists(errorFields.telefono) ? errorFields.telefono : null
              }
            />

            <Input
              inputId="emailPrincipal"
              xs={12}
              sm={4}
              md={6}
              label="E-mail principal"
              handleBlur={handleBlur}
              handleChange={handleFieldChange}
              error={
                varExists(errorFields.emailPrincipal)
                  ? errorFields.emailPrincipal
                  : null
              }
            />

            <Input
              inputId="emailSecundario"
              xs={12}
              sm={4}
              md={6}
              label="E-mail secundario"
              handleBlur={handleBlur}
              handleChange={handleFieldChange}
              error={
                varExists(errorFields.emailSecundario)
                  ? errorFields.emailSecundario.isError
                    ? errorFields.emailSecundario
                    : null
                  : null
              }
            />

            {showOptions && (
              <>
                <SelectInput
                  inputId="rucExtranPerNatural"
                  value={addForm.rucExtranPerNatural}
                  disabled={disableFields.rucExtranPerNatural}
                  xs={2}
                  sm={4}
                  md={3}
                  label="Ruc extranjero/Persona natural"
                  handleBlur={handleBlur}
                  handleChange={handleFieldChange}
                  error={
                    varExists(errorFields.rucExtranPerNatural)
                      ? errorFields.rucExtranPerNatural
                      : null
                  }
                >
                  <option value="default">Seleccione una opción</option>
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </SelectInput>

                <SelectInput
                  inputId="contribuyenteEspecial"
                  value={addForm.contribuyenteEspecial}
                  disabled={disableFields.contribuyenteEspecial}
                  xs={2}
                  sm={4}
                  md={3}
                  label="Contribuyente especial"
                  handleBlur={handleBlur}
                  handleChange={handleFieldChange}
                  error={
                    varExists(errorFields.contribuyenteEspecial)
                      ? errorFields.contribuyenteEspecial
                      : null
                  }
                >
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </SelectInput>

                <SelectInput
                  inputId="tituloSuperior"
                  value={addForm.tituloSuperior}
                  disabled={disableFields.tituloSuperior}
                  xs={2}
                  sm={4}
                  md={3}
                  label="Titulo superior(Honorarios)"
                  handleBlur={handleBlur}
                  handleChange={handleFieldChange}
                  error={
                    varExists(errorFields.tituloSuperior)
                      ? errorFields.tituloSuperior
                      : null
                  }
                >
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </SelectInput>

                <SelectInput
                  inputId="llevaContabilidad"
                  value={addForm.llevaContabilidad}
                  disabled={disableFields.llevaContabilidad}
                  xs={2}
                  sm={4}
                  md={3}
                  label="Lleva contabilidad"
                  handleBlur={handleBlur}
                  handleChange={handleFieldChange}
                  error={
                    varExists(errorFields.llevaContabilidad)
                      ? errorFields.llevaContabilidad
                      : null
                  }
                >
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </SelectInput>

                <SelectInput
                  inputId="impRenta"
                  value={addForm.impRenta}
                  disabled={disableFields.impRenta}
                  xs={2}
                  sm={4}
                  md={3}
                  label="Se le retiene el Imp. a la Renta"
                  handleBlur={handleBlur}
                  handleChange={handleFieldChange}
                  error={
                    varExists(errorFields.impRenta)
                      ? errorFields.impRenta
                      : null
                  }
                >
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </SelectInput>
              </>
            )}
          </FormModal>

          <ConfirmModal
            openDialog={openDeleteDialog}
            handleClose={() => setOpenDeleteDialog(false)}
            handleAction={handleDelete}
          >
            <Typography variant="h6">
              ¿Esta seguro de eliminar el/los producto(s) seleccionado(s)?
            </Typography>
          </ConfirmModal>

          <CustomModal
            title="Editar producto"
            titleIcon={
              <EditIcon
                sx={{
                  fontSize: 28,
                  color: "#3b83bd",
                }}
              />
            }
            openDialog={openEditDialog}
            handleClose={() => setOpenEditDialog(false)}
            handleAction={handleEdit}
            actionLabel="Editar"
          >
            <Box>
              <Box sx={{ margin: 2 }}>
                <TextField
                  label="Codigo principal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <KeyIcon />
                      </InputAdornment>
                    ),
                    value: editForm.codPrincipal,
                    id: "codPrincipal",
                    name: "codPrincipal",
                    onChange: handleChangeEdit,
                  }}
                  className={classes.textInput}
                />

                <TextField
                  label="Codigo Auxiliar"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <KeyIcon />
                      </InputAdornment>
                    ),
                    value: editForm.codAuxiliar,
                    id: "codAuxiliar",
                    name: "codAuxiliar",
                    onChange: handleChangeEdit,
                  }}
                />
              </Box>
              <Box sx={{ margin: 2 }}>
                <FormControl className={classes.select}>
                  <InputLabel id="demo-simple-select-label">
                    <CategoryIcon />
                    Tipo de producto
                  </InputLabel>
                  <Select
                    label="Tipo de producto"
                    name="tipoPro"
                    id="tipoPro"
                    onChange={handleChangeEdit}
                    value={editForm.tipoPro}
                  >
                    <MenuItem value={1}>1.Bienes</MenuItem>
                    <MenuItem value={2}>2.Servicios</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Valor unitario"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyIcon />
                      </InputAdornment>
                    ),
                    value: editForm.precio,
                    id: "precio",
                    name: "precio",
                    onChange: handleChangeEdit,
                  }}
                />
              </Box>
              <Box sx={{ margin: 2 }}>
                <FormControl className={classes.select}>
                  <InputLabel id="demo-simple-select-label">
                    <CalculateIcon />
                    Porcentaje de IVA
                  </InputLabel>
                  <Select
                    label="IVA"
                    name="iva"
                    id="iva"
                    onChange={handleChangeEdit}
                    value={editForm.iva}
                  >
                    <MenuItem value={1}>0%</MenuItem>
                    <MenuItem value={2}>12%</MenuItem>
                    <MenuItem value={3}>No objeto de impuesto</MenuItem>
                    <MenuItem value={4}>Excento</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ margin: 2 }}>
                <TextField
                  fullWidth
                  multiline
                  label="Nombre del producto o servicio"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DescriptionIcon />
                      </InputAdornment>
                    ),
                    value: editForm.nombre,
                    id: "nombre",
                    name: "nombre",
                    onChange: handleChangeEdit,
                  }}
                ></TextField>
              </Box>
            </Box>
          </CustomModal>
        </Stack>
      </MainLayout>
    );
  } else {
    return <LoadingPage />;
  }
};

export default ProvedoresPage;
