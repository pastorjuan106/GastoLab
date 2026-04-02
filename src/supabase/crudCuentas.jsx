import { supabase } from "../index";
export async function MostrarCuentas(p) {
  try {
    const { data } = await supabase
      .from("cuenta")
      .select()
      .eq("idusuario", p.idusuario)
      .maybeSingle();
      if(data){
        return data;
      }
    return data;
  } catch (error) {}
}

export async function EditarSaldoInicialCuenta(p) {
  const { error } = await supabase
    .from("cuenta")
    .update({
      saldo_actual: p.saldo,
      saldo_inicial_editado: true,
    })
    .eq("id", p.idcuenta);

  if (error) {
    console.error(error);
  }
}